const menuArray = [
    {
        name: "Pizza",
        ingredients: ["pepperoni, mushrom, mozarella"],
        id: 0,
        price: 14,
        emoji: "🍕"
    },
    {
        name: "Hamburger",
        ingredients: ["beef, cheese, lettuce"],
        price: 12,
        emoji: "🍔",
        id: 1
    },
        {
        name: "Beer",
        ingredients: ["grain, hops, yeast, water"],
        price: 12,
        emoji: "🍺",
        id: 2
    }
]

let count = 0

let pizza = 0
let hamburger = 0
let beer = 0

document.addEventListener("click", function(e){
    if(e.target.dataset.add){
        handleOrder(e.target.dataset.add)
    } else if(e.target.dataset.remove){
        removeItem(e.target.dataset.remove)
    } else if(e.target.id === 'order-btn'){
        makeOrderBtn()
    } else if(e.target.id === 'pay-order'){
        payOrderBtn()
    }
})

function handleTotalOrder() {
    
    if(count === 0) {
        document.getElementById("order-list").innerHTML = ""
        document.getElementById("total").innerHTML = ""
    } else {
            document.getElementById("order-list").innerHTML = `
    <div class="your-order-list">
            <p class="price">Your order:</p>
    </div>
    ` 
    
    document.getElementById("total").innerHTML = `
    <div class="total-price">
        
            <p class="price">Total price:</p>
            <p class="price">$${count}</p>
        
    
    
    <button class="order-btn" id="order-btn">Make order</button>
    </div>
    <div class="complete-box" id="complete-box">
        <div class="complete-box-inner" id="complete-box-inner">
        </div>
    </div>
    ` 
    }
}

function handleOrder(orderId){ //handle Plus buttons
    document.getElementById(`replies-${orderId}`).classList.remove('hidden') 
    document.getElementById(`plsbtn-${orderId}`).classList.add('hidden') 
    const targetMenuId = menuArray.filter(function(menuId){  
    return menuId.id == orderId
    })[0]
    
    count += targetMenuId.price
  console.log(pizza + 1)
  
  return handleTotalOrder() 
}

function removeItem(removeId){ //handle remove buttons  
    document.getElementById(`replies-${removeId}`).classList.add('hidden')
   document.getElementById(`plsbtn-${removeId}`).classList.remove('hidden') 
 
    const targetMenuId = menuArray.filter(function(menuId){
    return menuId.id == removeId
    })[0]
    
    count -= targetMenuId.price
    
    return handleTotalOrder()
}

function makeOrderBtn(){ //handle make order button
    const completeBox = document.getElementById("complete-box")
    const completeBoxInner = document.getElementById("complete-box-inner")
    
    completeBoxInner.innerHTML = `
    <h3>Enter cart details</h3>
    <form class="form-details" id="consent-form">
    <input type="text" name="fullName" placeholder="Enter your name" required>
    <input type="text" placeholder="Enter card number" required>
    <input type="text" placeholder="Enter CVV" required>
    <button class="pay-order" id="pay-order">Pay</button>
    </form>`
    
    completeBox.style.display = 'flex'
}

function payOrderBtn(){ // Handle Pay order button
    const completeBox = document.getElementById("complete-box")
    const completeBoxInner = document.getElementById("complete-box-inner")
    
    const consentForm = document.getElementById('consent-form') //Take control of form
    const consentFormData = new FormData(consentForm) //Save object data from frm to consentFormData
    const name = consentFormData.get('fullName') //Save name to new const name
    
    document.getElementById("order-list").innerHTML = "" //delete "Your order" text
    document.getElementById("total").innerHTML = `   
    <div class="complete-box" id="complete-box">
        <div class="complete-box-inner" id="complete-box-inner">
        </div>
    </div>` 
  
    document.getElementById("order").innerHTML = `
    <div>
        <p class="thx-message">Thanks, ${name}. Your order is on its way!</p> 
    </div>  
`   
    completeBox.style.display = 'none'
  
  setTimeout(function(){
  renderMenu()
  document.getElementById("order").innerHTML = ""  
  }, 3000)
}

function getHtml() {
    let createHtml = ""
    menuArray.forEach(function(menuItem){
        
        createHtml += `
        <div class="container">
            <div class="wrapper">
                <div class="emoji">
                    <p class="profile-pic">${menuItem.emoji}</p>
                </div>
                <div class="left-side">
                    <p class="item-name">${menuItem.name}</p>
                    <p class="item-ingredience">${menuItem.ingredients}</p>
                    <p class="item-price">$${menuItem.price}</p>  
                </div>
                <div class="plus-btn" id="plsbtn-${menuItem.id}">
                    <p class="plus-button" data-add="${menuItem.id}">+</p>
                </div>
            </div>    
        </div>`     
    })
    
    menuArray.forEach(function(menuItem){
    document.getElementById('order').innerHTML += `
        <div class="hidden" id="replies-${menuItem.id}">
            <div class="your-order">
                
                    <p class="your-order-price">${menuItem.name}<span class="remove" data-remove="${menuItem.id}"> (remove)</span></p> 
                    <p class="your-order-price">$${menuItem.price}</p> 
                
            </div>  
        </div> 
`
}) 
    return createHtml 
}

function renderMenu(){
    document.getElementById('feed').innerHTML = getHtml()
}

renderMenu()