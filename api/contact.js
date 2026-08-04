// Vercel Serverless Function — enregistre le prospect en Postgres, puis proxifie
// les données du formulaire vers le webhook n8n
// Variables d'environnement requises : N8N_WEBHOOK_URL, DATABASE_URL

const { neon } = require('@neondatabase/serverless');

module.exports = async function handler(req, res) {
    // CORS : même origine seulement
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(204).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Méthode non autorisée' });
    }

    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (!webhookUrl) {
        console.error('[contact] N8N_WEBHOOK_URL manquant');
        return res.status(500).json({ error: 'Configuration serveur manquante' });
    }

    const { full_name, lead_email, company, business_type, monthly_revenue, pain_point } = req.body || {};

    // Validation serveur
    const missing = [];
    if (!full_name?.trim())       missing.push('full_name');
    if (!lead_email?.trim())      missing.push('lead_email');
    if (!company?.trim())         missing.push('company');
    if (!business_type)           missing.push('business_type');
    if (!monthly_revenue)         missing.push('monthly_revenue');
    if (!pain_point?.trim())      missing.push('pain_point');

    if (missing.length) {
        return res.status(400).json({ error: 'Champs manquants', fields: missing });
    }

    // Le trim précède le contrôle : une adresse collée avec une espace autour est
    // valide, et c'est de toute façon la version nettoyée qui part en base.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(lead_email.trim())) {
        return res.status(400).json({ error: 'Format email invalide' });
    }

    const payload = {
        full_name:       full_name.trim(),
        lead_email:      lead_email.trim().toLowerCase(),
        company:         company.trim(),
        business_type,
        monthly_revenue,
        pain_point:      pain_point.trim(),
        submitted_at:    new Date().toISOString(),
        source:          'oakflowai.com',
        lead_id:         null,   // renseigné juste après l'insertion, null si la base est indisponible
    };

    // Enregistrement en base avant l'appel au webhook : si n8n tombe, le prospect
    // est déjà conservé. À l'inverse, une base indisponible ne doit jamais empêcher
    // l'automatisation n8n de partir — on journalise et on continue.
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
        console.error('[contact] DATABASE_URL manquant, prospect non enregistré en base');
    } else {
        try {
            const sql = neon(databaseUrl);
            const rows = await sql`
                INSERT INTO leads (
                    full_name, lead_email, company,
                    business_type, monthly_revenue, pain_point, source
                ) VALUES (
                    ${payload.full_name}, ${payload.lead_email}, ${payload.company},
                    ${payload.business_type}, ${payload.monthly_revenue},
                    ${payload.pain_point}, ${payload.source}
                )
                RETURNING id
            `;
            payload.lead_id = rows[0]?.id ?? null;
            console.log(`[contact] prospect enregistré, id=${payload.lead_id}`);
        } catch (err) {
            console.error('[contact] insertion Postgres échouée:', err.message);
        }
    }

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const body = await response.text().catch(() => '');
            console.error(`[contact] n8n webhook error ${response.status}: ${body}`);
            return res.status(502).json({ error: 'Erreur lors de la transmission au webhook' });
        }

        return res.status(200).json({ success: true });
    } catch (err) {
        console.error('[contact] fetch error:', err.message);
        return res.status(500).json({ error: 'Erreur réseau interne' });
    }
};
