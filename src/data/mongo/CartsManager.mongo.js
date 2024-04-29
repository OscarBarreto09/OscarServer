import Manager from "./Manager.mongo.js";
import Cart from "./models/cart.model.js";

async function test() {
    try {
        // Crea una instancia de Manager, pasando un modelo (supongamos que ya tienes un modelo definido)
        const manager = new Manager(Cart);

        // Prueba el método create
        console.log("Creando un nuevo registro...");
        const newRecord = await manager.create({ /* datos del nuevo registro */ 
        user_id: '662eafc4d4f4f6d5e207e69d',
        product_id: '662eaf410d9bced048a8e66a',
        quantity: 3
    });
        console.log("Registro creado:", newRecord);

        // Prueba el método read
        console.log("Leyendo todos los registros...");
        const allRecords = await manager.read();
        console.log("Registros encontrados:", allRecords);

        // Prueba el método readOne (suponiendo que tengas el ID de un registro existente)
        console.log("Leyendo un registro por ID...");
        const recordId = "662eaf410d9bced048a8e66a";
        const oneRecord = await manager.readOne(recordId);
        console.log("Registro encontrado:", oneRecord);

        // Prueba el método update (suponiendo que tengas el ID de un registro existente y los nuevos datos a actualizar)
        console.log("Actualizando un registro...");
        const updateRecordId = "662ec5662fd80be57c364c20";
        const newData = { /* nuevos datos del registro */
        quantity: 6
    };
        const updatedRecord = await manager.update(updateRecordId, newData);
        console.log("Registro actualizado:", updatedRecord);

        // Prueba el método destroy (suponiendo que tengas el ID de un registro existente a eliminar)
        console.log("Eliminando un registro...");
        const deleteRecordId = "662ec2a4bad43e7582f40a3c";
        await manager.destroy(deleteRecordId);
        console.log("Registro eliminado." + deleteRecordId);

    } catch (error) {
        console.error("Error en la prueba:", error);
    }
}

// Ejecuta la función de prueba
test();


const cartsManager = new Manager(Cart);
export default cartsManager; 
