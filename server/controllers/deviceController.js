const uuid = require("uuid");
const path = require("path");
const { Device,DeviceInfo } = require("../models/models");
const ApiError = require("../error/ApiError");
const { json } = require("sequelize");
class DeviceController {
  async create(req, res, next) 
  {
    try {
      console.log("1231123213131123")
      let  { name, price, brandId, typeId, info } = req.body; // получили данные с тела запроса
      const   { img } = req.files;
      let fileName = uuid.v4() + ".jpg"; //uuid уникальное имя для айди
      img.mv(path.resolve(__dirname, "..", "static", fileName)); // для выгрузки файла с клиента
      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });
      if(info)
        {
          console.log("123123122312231123")
       // info = JSON.parse(info)
       let info_obj = JSON.parse(info);
       info_obj.foreach(i=>DeviceInfo.create({
          title: i.title,
          description: i.description,
          deviceId: device.id
        }))
      }
      
      return res.json(device);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async getAll(req, res) {
    console.log("We are in devece Controller get All method")
    let { brandId, typeId,limit,page } = req.query;  
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit; // отступ
    let devices;
    if (!brandId && !typeId) 
    {
     // devices = await Device.findAll()
      devices = await Device.findAndCountAll({limit,offset});
    }
    if (brandId && !typeId) 
    {
     // devices = await Device.findAll({where:{brandId}})
      devices = await Device.findAndCountAll({where:{brandId}, limit,offset});
    }
    if (!brandId && typeId) 
    {
     // devices = await Device.findAll({where:{typeId}})
      devices = await Device.findAndCountAll({where:{typeId}, limit,offset});
    }
    if (brandId && typeId) {
     // devices = await Device.findAll({where:{brandId,typeId}})
      devices = await Device.findAndCountAll({where:{brandId,typeId}, limit,offset});
    }
    return res.json(devices);
  }
  async getOne(req, res) {
    const{id} = req.params
    const device = await Device.findOne({
      where:{id},
      include:[{
        model:DeviceInfo, as :'info'
      }]
    })
    return res.json(device)
  }
}
module.exports = new DeviceController();
