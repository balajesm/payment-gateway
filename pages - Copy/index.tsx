import { resolve } from "path";

export default function Home() {
  async function showRazorpay() {
    const res = await loadRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    // Make API call to the serverless API
    const data = await fetch("/api/razorpay", { method: "POST" }).then((t) =>
      t.json()
    );
    console.log(data);
    var options = {
      key: process.env.KEY, // Enter the Key ID generated from the Dashboard
      name: "Manu Arora Pvt Ltd",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Thankyou for your test donation",
      image: "https://manuarora.in/logo.png",
      handler: function (response:any) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: "Manu Arora",
        email: "manuarorawork@gmail.com",
        contact: "9999999999",
      },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();  
  }
  function loadRazorpay() {
    return new Promise((resolve)=>{
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = ()=> {
        resolve(true);
      }
      script.onerror = ()=>{
        resolve(false);
      }
      document.body.appendChild(script);

    });
  }

  return (
    <button onClick={showRazorpay}>Pay</button>
  )
}
