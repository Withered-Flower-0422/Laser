// @ts-nocheck
import { editor, file, scene, dialogWindowManager, Float2 } from "editorApi";
const addHurtUITexAsset = () => {
    const path = "Textures/Screen/Screen_Red.tex";
    if (!file.exist(`${file.dataDirectoryPath}/Assets/${path}`))
        return false;
    const assetReference = scene
        .getAllObjects()
        .find(obj => obj.type === "Settings")
        .getComponent("AssetReference");
    const data = JSON.parse(assetReference.getData());
    if (data.Textures.includes(path))
        return true;
    data.Textures.push(path);
    assetReference.setData(JSON.stringify(data));
    return true;
};
const createRayTemplate = () => {
    const res = [];
    for (const obj of scene.getAllObjects()) {
        if (obj.type !== "Item")
            continue;
        if (JSON.parse(obj.getComponent("Settings").getData())
            .TemplateName === "LaserRay")
            res.push(obj);
    }
    if (res.length === 0) {
        const ray = scene.createObject("LaserRay", "Item");
        const settings = ray.getComponent("Settings");
        const settingsData = JSON.parse(settings.getData());
        settingsData.AsTemplate = true;
        settingsData.TemplateName = "LaserRay";
        settings.setData(JSON.stringify(settingsData));
        const renderer = ray.addComponent("Renderer");
        const rendererData = JSON.parse(renderer.getData());
        rendererData.AutoGetMaterials = false;
        renderer.setData(JSON.stringify(rendererData));
        const roadGenerator = ray.addComponent("RoadGenerator");
        const roadGeneratorData = JSON.parse(roadGenerator.getData());
        roadGeneratorData.GeneratorAlgorithm = 3;
        roadGeneratorData.Rail.Length = 1;
        roadGeneratorData.Rail.Offsets = [new Float2(0, 0)];
        roadGeneratorData.Rail.Radius = 0.01;
        roadGenerator.setData(JSON.stringify(roadGeneratorData));
        res.push(ray);
    }
    return res;
};
export const menuPath = editor.language === "Chinese" ? "启用激光" : "Enable Laser";
export const execute = () => {
    if (!addHurtUITexAsset()) {
        dialogWindowManager.openMessageDialog(menuPath, editor.language === "Chinese"
            ? '"Screen_Red.tex" 材质文件不存在，请将其添加到 "Assets/Textures/Screen/" 文件夹中。'
            : '"Screen_Red.tex" not found. Please add it to "Assets/Textures/Screen/" folder.', editor.language === "Chinese" ? "确认" : "Ok", () => { });
        return;
    }
    const rays = createRayTemplate();
    if (rays.length > 1) {
        dialogWindowManager.openMessageDialog(menuPath, editor.language === "Chinese"
            ? "检测到场景中存在多个激光模板，请删除多余的模板。"
            : "Detected more than one LaserRay template in the scene. Please remove the extra ones.", editor.language === "Chinese" ? "确认" : "Ok", () => { });
    }
    else {
        dialogWindowManager.openMessageDialog(menuPath, editor.language === "Chinese"
            ? "激光已启用。"
            : "Laser has been enabled.", editor.language === "Chinese" ? "确认" : "Ok", () => { });
    }
};
