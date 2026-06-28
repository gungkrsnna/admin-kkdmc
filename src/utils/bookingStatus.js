export const formatBookingStatus = (
    status
  ) => {
  
    switch(status){
  
      case "draft":
        return "Draft";
  
      case "pending_payment":
        return "Pending Payment";
  
      case "review":
        return "Payment Review";
  
      case "confirmed":
        return "Confirmed";
  
      case "completed":
        return "Completed";
  
      case "cancelled":
        return "Cancelled";
  
      default:
        return status;
    }
  
  };

  export const getBookingStatusClass = (
    status
  ) => {
  
    switch(status){
  
      case "draft":
        return "bg-gray-100 text-gray-700";
  
      case "pending_payment":
        return "bg-yellow-100 text-yellow-700";
  
      case "review":
        return "bg-blue-100 text-blue-700";
  
      case "confirmed":
        return "bg-green-100 text-green-700";
  
      case "completed":
        return "bg-emerald-100 text-emerald-700";
  
      case "cancelled":
        return "bg-red-100 text-red-700";
  
      default:
        return "bg-gray-100 text-gray-700";
    }
  
  };

  export const formatPaymentStatus = (
    status
  ) => {
  
    switch(status){
  
      case "unpaid":
        return "Unpaid";
  
      case "review":
        return "Payment Review";
  
      case "paid":
        return "Paid";
  
      case "refunded":
        return "Refunded";
  
      default:
        return status;
    }
  
  };

  export const getPaymentStatusClass = (
    status
  ) => {
  
    switch(status){
  
      case "unpaid":
        return "bg-red-100 text-red-700";
  
      case "review":
        return "bg-blue-100 text-blue-700";
  
      case "paid":
        return "bg-green-100 text-green-700";
  
      case "refunded":
        return "bg-purple-100 text-purple-700";
  
      default:
        return "bg-gray-100 text-gray-700";
    }
  
  };

  export const formatPaymentMethod = (
    method
  ) => {
  
    switch(method){
  
      case "cash":
        return "Cash";
  
      case "bank_transfer":
        return "Bank Transfer";
  
      case "qris":
        return "QRIS";
  
      default:
        return method || "-";
    }
  
  };

  export const formatBookingSource = (
    source
  ) => {
  
    switch(source){
  
      case "website":
        return "Website";
  
      case "admin":
        return "Admin";
  
      case "whatsapp":
        return "WhatsApp";
  
      case "agent":
        return "Travel Agent";
  
      default:
        return source || "-";
    }
  
  };