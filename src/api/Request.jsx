import axios from "axios";

export const Api = axios.create({
    baseURL: "http://localhost:3000/users"
});

export const GetUsers = async () => {
    try {
        const response = await Api.get("/")
        if (response.status !== 200) {
            throw new Error("error")
        }
        else {
            return response.data
        }
    }
    catch (error) {
        console.log(error.message);
    }
}



export const GetSingleUser = async (id) => {
    try {
        const response = await Api.get(`/${id}`)
        if (response.status !== 200) {
            throw new Error("error")    
        }
        else {
            return response.data
        }
    }
    catch (error) {
        console.log(error.message);
    }
}


export const AddSingleUser = async (newUser) => {
    try {
        const response = await Api.post("/", newUser)
        if (response.status !== 201) {
            throw new Error("error")
        }
        else {
            return response.data
        }
    }
    catch (error) {
        console.log(error.message);

    }
}



export const EditSingleUser = async (id, editUser) => {
    try {
        const response = await Api.put(`/${id}`, editUser);
        if (response.status !== 200) {
            throw new Error("error")
        }
        else {
            return response.data
        }
    }
    catch (error) {
        console.log(error.message);

    }
}


export const DeleteSingleUser = async (id)=>{
    try{
        const response = await Api.delete(`/${id}`)
        if(response.status !== 200){
            throw new Error("error")
        }
        else{
            return response.data
        }
    }
    catch(error){
        console.log(error.message);
        throw error;
    }
}