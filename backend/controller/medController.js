import medModel from "../models/medModel.js";

//Add medicine to the database
export const addMedicine = async (req,res) => {
    try {

        const {name,brand,expireDate,price,quantity} = req.body;

        if(!name || !brand || !expireDate || !price){
            return res.status(406).json({
                message:"Fill required fields."
            })
        }

        const existMed = await medModel.findOne({ 
            name: { $regex: new RegExp(`^${name}$`, 'i') },
            brand: { $regex: new RegExp(`^${brand}$`, 'i') },
            expireDate: new Date(expireDate)
        });

        if(existMed){
            existMed.quantity = existMed.quantity + (quantity || 1);
            existMed.price=price;
            const updatedMed = await existMed.save();
            return res.status(200).json({
                message:"Medicine already exists! Quantity updated.",
                data:updatedMed
            });
        }

        const newMedicine = new medModel({
            name,
            brand,
            expireDate,
            price,
            quantity: quantity || 1
        })

        const savedMedicine = await newMedicine.save();
        return res.status(200).json({
            success: true,
            message:"Medicine added successfully",
            data:savedMedicine
        })
    } catch (error) {
        console.error("Error adding medicine:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

//Fetch all medicines
export const getMedicine = async (req,res) => {
    try {
        const medicine = await medModel.find().sort({ createdAt: -1 });
        if(!medicine){
            return res.status(404).json({
                message: "No medicines found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Medicines fetched successfully",
            count: medicine.length,
            data: medicine
        });
    } catch (error) {
        console.log("Error while fetching the medicine:", error);
        return res.status(500).json({
            success: false,
            message: "Error while fetching medicines",
            error: error.message
        });
    }
}

//Search a medicine
export const searchMedicine = async (req, res) => {
    try {
        const searchKey = req.query.query;

        if (!searchKey || searchKey.trim() === '') {
            return res.status(400).json({
                success: false,
                message: "Fill the search field."
            });
        }

        
        const medicines = await medModel.find({
            $or: [
                { name: { $regex: searchKey, $options: 'i' } },
                { brand: { $regex: searchKey, $options: 'i' } }
            ]
        }).sort({ createdAt: -1 });

        
        if (!medicines || medicines.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No medicines found",
                data: []
            });
        }

        return res.status(200).json({
            success: true,
            message: `${medicines.length} medicine(s) found`,
            count: medicines.length,
            data: medicines
        });

    } catch (error) {
        console.log("Error while searching medicine:", error);
        return res.status(500).json({
            success: false,
            message: "Error while searching medicines",
            error: error.message
        });
    }
}