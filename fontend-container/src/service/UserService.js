export const getProdutList = async () => {  
        const result = await get("products");
        return result  ; 
  
    }
    export const getSubmit = async (options) => {  
        const response = await  fetch(`http://localhost:3000/products`,{
            method : "POST" , 
            headers : {
                    Accept :"applicatio/json",
                    "Content-Type" : "applicatio/json"
            },
            body: JSON.stringify(options)  
            // ko sửa thành option thì nó sẽ bị lỗi 
        }) ; 
        const result = await response.json() ;
        return result  ; 
  
    }
