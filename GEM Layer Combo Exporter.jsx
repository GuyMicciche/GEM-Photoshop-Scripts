/**
 * Photoshop ExtendScript to Export Layer Combinations as PNGs
 * 
 * This script is designed to work with Adobe Photoshop. It loops through the layers 
 * in the first two layer groups of the active document. For each combination of layers 
 * from these two groups, it exports a PNG image. The naming convention for the exported 
 * PNGs is based on the names of the combined layers.
 * 
 * Usage:
 * 1. Ensure that the active Photoshop document has at least two layer groups.
 * 2. Run the script.
 * 
 * The exported PNGs will be saved to the user's desktop by default. This path can be 
 * modified in the script.
 * 
 * Author: Guy Micciche
 * 
 */

// Set the path where the files will be saved
const filePath = "~/Desktop/";

// Get the groups of layers in the active document
const MyGroups = app.activeDocument.layerSets;

// Function to save the document as PNG
function SavePNG(saveFile) { 
    var pngOpts = new ExportOptionsSaveForWeb(); 
    pngOpts.format = SaveDocumentType.PNG; 
    pngOpts.PNG8 = false;  
    pngOpts.transparency = true;  
    pngOpts.interlaced = false;  
    pngOpts.quality = 100; 
    activeDocument.exportDocument(new File(saveFile), ExportType.SAVEFORWEB, pngOpts);  
}

// Loop through the layers in the first group
for (var i = 0; i < MyGroups[0].layers.length; i++) { 
    var obj = MyGroups[0].layers[i];
    var originalVisibilityObj = obj.visible; // Store the original visibility
    obj.visible = true;  // Turn on the current layer in group 1
  
    // Loop through the layers in the second group
    for (var j = 0; j < MyGroups[1].layers.length; j++) { 
        var objinner = MyGroups[1].layers[j];
        var originalVisibilityObjInner = objinner.visible; // Store the original visibility
        objinner.visible = true;  // Turn on the current layer in group 2

        // Save the file with the combination of the two layers' names
        var fileNamePath = fileNamePath = filePath + obj.name + "-" + objinner.name + ".png";
        SavePNG(fileNamePath);  

        objinner.visible = originalVisibilityObjInner;  // Restore the original visibility for the layer in group 2
    }  

    obj.visible = originalVisibilityObj;  // Restore the original visibility for the layer in group 1
}
