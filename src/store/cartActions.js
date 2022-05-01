import { cartActions } from "./cartSlice";
import { uiActions } from "./uiSlice";

export const fetchData = () => {
    return async (dispatch) => {
      const fetchHandler = async () => {
        const res = await  fetch('https://reduxhttp-9eed7-default-rtdb.asia-southeast1.firebasedatabase.app/cartItems');
        const data = await res.json();
        return data;
      };
      try {
        const cartData = await fetchHandler();
        console.log(cartData);
        dispatch(cartActions.replaceData(cartData));
      } catch (err) {
        dispatch(
          uiActions.showNotification({
            open: true,
            message: "Sending Request Failed",
            type: "error",
          })
        );
      }
    };
  };

export const sendCartData = (cart) => {
    return async(dispatch) => {
        dispatch(uiActions.showNotification({
            message: "Sending...",
            open: true,
            alert: 'warning'
          }));
          const sendRequest = async () => {
            const response = await  fetch('https://reduxhttp-9eed7-default-rtdb.asia-southeast1.firebasedatabase.app/cartItems',{
              method: 'PUT',
              body: JSON.stringify(cart)
            });
            const data = await response.json();
            dispatch(uiActions.showNotification({
              message: "Sent",
              open: true,
              alert: 'success'
            }));
          };
          try{
             sendRequest();
           }catch(err){
               dispatch(uiActions.showNotification({
                   message: "Sending Fail",
                   open: true,
                   alert: 'error'
                 }));
           }
    }

}