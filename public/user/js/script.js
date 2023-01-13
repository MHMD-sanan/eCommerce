function addToCart(proId){
    $.ajax({
        url:'/addToCart/'+proId,
        method:'get',
        success:(res)=>{
            let count=$('#cart-count').html();
            count=res.status; 
            $('#cart-count').html(count);
            $("#test").load(location.href + " #test>*", "");
        }
    })
}

function incQty(proId){
    $.ajax({
      url:'/incQty/'+proId,
      method:'get',
      success:(res)=>{
        let count=$('#qty').html();
        count=parseInt(count)+1;
        $('#qty').html(count);
        let totalPrice=res.totalPrice;
        $('#totalPrice').html(totalPrice);
      }
    })
}