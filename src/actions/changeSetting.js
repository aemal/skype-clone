
export function changeSetting(url,formData,token) {
    return dispatch => {
        fetch(url, {
                method: "POST",
                headers: { 
                'Authorization': `TOKEN ${token}`
                },
                body: formData 
            })
            .then(response => response.json())
                .then(response => {
                    
                    dispatch({ type: "CHANGE_USER_DONE", payload: response });   
                }) 
                .catch(err => {
                    dispatch({ type: "CHANGE_USER_WITHERROR", payload: err });

                });
                     
    }
}


