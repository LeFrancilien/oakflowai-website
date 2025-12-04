from PIL import Image
import sys

def remove_black_background(input_path, output_path, threshold=50):
    try:
        img = Image.open(input_path).convert("RGBA")
        datas = img.getdata()

        newData = []
        for item in datas:
            # Si le pixel est sombre (proche du noir), on le rend transparent
            # Seuil augmenté à 50 pour supprimer le bruit/points gris
            if item[0] <= threshold and item[1] <= threshold and item[2] <= threshold:
                newData.append((0, 0, 0, 0))
            else:
                newData.append(item)

        img.putdata(newData)
        img.save(output_path, "PNG")
        print(f"Successfully processed {input_path} to {output_path}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    # On repart du fichier source copié précédemment (qui a peut-être déjà été traité, mais on va le retraiter ou mieux, reprendre l'original si possible)
    # Pour être sûr, je vais pointer vers le fichier actuel qui contient le logo (même s'il a déjà de la transparence, le script va nettoyer le reste)
    input_file = r"c:\Users\user\.gemini\antigravity\playground\final-celestial\assets\images\logo-voxel-new.png"
    output_file = r"c:\Users\user\.gemini\antigravity\playground\final-celestial\assets\images\logo-voxel-clean.png"
    
    remove_black_background(input_file, output_file, threshold=50)
