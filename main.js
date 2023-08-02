const trendDown = `<svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.5 9.5L6.75 4.75L4.25 7.25L0.5 3.5" stroke="#F5450D" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M8.5 9.5H11.5V6.5" stroke="#F5450D" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `
    const trendUp = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.5 3L6.75 7.75L4.25 5.25L0.5 9" stroke="#07D635" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M8.5 3H11.5V6" stroke="#07D635" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`

    const currentTime = new Date()
    const date = document.getElementById("date")
    date.textContent = `${currentTime.getDate()}/${currentTime.getMonth()+1}/${currentTime.getFullYear()} ${currentTime.getHours()}:${currentTime.getMinutes()}`


const api = axios.create({
    baseURL: "https://api.coingecko.com/api/v3/",
    headers: {
        "Content-Type": "application/json;charset=utf-8" 
    },
    params: {
        //Aqui se pueden agregar parametros como la API_KEY sin necesidad de tener que concatenar luego
    }

}
    
) 

async function test() {
    const {data} = await api(`coins/markets?vs_currency=usd&per_page=4`)
    
return data
    
    
}

async function deploy() {
    const coins = await test()
    console.log(coins);
    console.log(coins[0].current_price.toLocaleString());
    const coinsContainers = document.querySelectorAll("[data-cryptoName]")
    const priceContainers = document.querySelectorAll("[data-price]")
    
    const trend = document.querySelectorAll("[data-trend]")
 
    
   
    coins.forEach((coin, index) => {
        
        coinsContainers[index].textContent = `${coin.id.toUpperCase()} (${coin.symbol.toUpperCase()})`
        priceContainers[index].textContent = `${coin.current_price.toLocaleString()}$`
        if(coin.price_change_percentage_24h < 0) {
            trend[index].innerHTML = trendDown 
            return

        }
        trend[index].innerHTML = trendUp
        
          
       
    });

   

}


deploy()