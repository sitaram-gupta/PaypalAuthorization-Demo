paypal
  .Buttons({
    // Sets up the transaction when a payment button is clicked
    createOrder: function (data, actions) {
      return fetch("/api/orders", {
        method: "post",
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          return response.id;
        });
    },


    // Authoriza the transaction after payer approval
    onApprove: function (data, actions) {
        console.log("ssss onAuthorize Called")
      return fetch(`/api/orders/${data.orderID}/authorize`, {
        method: "post",
      })
        .then((response) => response.json())
        .then(function (orderData) {
          // Successful athorized! For dev/demo purposes:
          console.log(
            "Authorize result",
            orderData,
            JSON.stringify(orderData, null, 2)
          );
          var transaction = orderData.purchase_units[0].payments.authorizations[0];
          alert(
            "Transaction " +
              transaction.status +
              ": " +
              transaction.id +
              "\n\nSee console for all available details"
          );

          // When ready to go live, remove the alert and show a success message within this page. For example:
          // var element = document.getElementById('paypal-button-container');
          // element.innerHTML = '';
          // element.innerHTML = '<h3>Thank you for your payment!</h3>';
          // Or go to another URL:  actions.redirect('thank_you.html');
        });
    },
    

    // // Finalize the transaction after payer approval
    // onApprove: function (data, actions) {
    //   return fetch(`/api/orders/${data.orderID}/capture`, {
    //     method: "post",
    //   })
    //     .then((response) => response.json())
    //     .then(function (orderData) {
    //       // Successful capture! For dev/demo purposes:
    //       console.log(
    //         "Capture result",
    //         orderData,
    //         JSON.stringify(orderData, null, 2)
    //       );
    //       var transaction = orderData.purchase_units[0].payments.captures[0];
    //       alert(
    //         "Transaction " +
    //           transaction.status +
    //           ": " +
    //           transaction.id +
    //           "\n\nSee console for all available details"
    //       );

    //       // When ready to go live, remove the alert and show a success message within this page. For example:
    //       // var element = document.getElementById('paypal-button-container');
    //       // element.innerHTML = '';
    //       // element.innerHTML = '<h3>Thank you for your payment!</h3>';
    //       // Or go to another URL:  actions.redirect('thank_you.html');
    //     });
    // },
  })
  .render("#paypal-button-container");