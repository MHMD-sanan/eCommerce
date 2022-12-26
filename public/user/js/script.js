function addToCart(proId){
    $.ajax({
        url:'/addToCart/'+proId,
        method:'get',
        success:(res)=>{
            let count=$('#cart-count').html();
            count=res.status;
            $('#cart-count').html(count);
        }
    })
}   