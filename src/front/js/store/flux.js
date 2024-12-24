const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			login: async (email, password) => {
				try{
					// fetching data from the backend
					const response = await fetch(process.env.BACKEND_URL + "/api/login", {
						method: "POST",
						headers: {"Content-Type": "application/json"},
						body:JSON.stringify({
							email: email,
							password: password
						})
					})

					if (!response.ok){
						throw new Error("Failed to login")
					}
					const data = await response.json()
					sessionStorage.setItem("accessToken", data.access_token)

					setStore({ message: data.message })
					
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				
				const store = getStore();

				
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
