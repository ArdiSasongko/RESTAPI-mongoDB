const httpStatus = require("http-status")
const People = require("../model/people")
const peopleValidator = require("../utils/peopleValidator")
const Response = require("../model/Response")

const addPeople = async (req, res) => {
  let response;
  try {
    const request = await peopleValidator.validateAsync(req.body);
    const people = new People(request);
    const result = await people.save();
    response = new Response.Success(false, "Success Adding People", result);
    res.status(httpStatus.OK).json(response);
  } catch (error) {
    response = new Response.Error(true, error.message);
    res.status(httpStatus.BAD_REQUEST).json(response);
  }
}

const getPeople = async (req, res) => {
  try {
    let query = {}
    const people = await People.find(query);

    if (people.length === 0) {
      const response = new Response.Error(true, "People not Found");
      res.status(httpStatus.BAD_REQUEST).json(response);
    } else {
      const dataPeople = people.map((data)=>{
        const { name, age } = data
        return { name, age}
      })
      const response = new Response.Success(false, "People found", dataPeople);
      res.status(httpStatus.OK).json(response);
    }
  } catch (error) {
    const response = new Response.Error(true, error.message);
    res.status(httpStatus.BAD_REQUEST).json(response);
  }
}

const getbyUsername = async (req,res) =>{
  try {
    const { name } = req.params
    const people = await People.findOne({name})
    if(people){
      const response = new Response.Success(false, "Find Data", people)
      res.status(httpStatus.OK).json(response)
    }else{
      const response = new Response.Error(true, "Data not Found")
      res.status(httpStatus.BAD_REQUEST).json(response)
    }
  } catch (error) {
    const response = new Response.Error(true, error.message);
    res.status(httpStatus.BAD_REQUEST).json(response);
  }
}

const updatePeople = async (req,res) =>{
  try{
    const { id } = req.params
    const request = await peopleValidator.validateAsync(req.body)
    const result = await People.findByIdAndUpdate(id, request, {new:true})

    if(result){
      const response = new Response.Success(false, "Success Update", result)
      res.status(httpStatus.OK).json(response)
    }else{
      const response = new Response.Error(true, "Cant Find Id")
      res.status(httpStatus.BAD_REQUEST).json(response)
    }
  }catch(error){
      const response = new Response.Error(true, error.message)
      res.status(httpStatus.BAD_REQUEST).json(response)
  }
}

const deletePeople = async (req,res) =>{
  try{
    const { id } = req.params
    const result = await People.findByIdAndDelete(id)

    if(result){
      const response = new Response.Success(false, "Success Delete", result)
      res.status(httpStatus.OK).json(response)
    }else{
      const response = new Response.Error(true, "Cant Delete")
      res.status(httpStatus.BAD_REQUEST).json(response)
    }
  }catch(error){
    const response = new Response.Error(true, error.message)
    res.status(httpStatus.BAD_REQUEST).json(response)
  }
}

module.exports = { addPeople, getPeople, getbyUsername, updatePeople, deletePeople };
