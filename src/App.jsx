import { useEffect, useState } from "react";
import { useLeaveConfirmation } from "./hooks/useLeaveConfirmation";
import { useDragScroll } from "./hooks/useDragScroll";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";


const App = () => {
  // initialise orderId for global leave confirmation
  const [orderId, setOrderId] = useState(localStorage.getItem("currentOrderId"));
  const scrollRef = useDragScroll(true);

  // keep orderId synced with localStorage changes
  useEffect(() => {
    const updateOrderId = () => {
      setOrderId(localStorage.getItem("currentOrderId"));
    };

    // listen for updates from other tabs
    window.addEventListener("storage", updateOrderId);

    // listen for updates in the same tab
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function (key, value) {
      originalSetItem.apply(this, arguments);
      if (key === "currentOrderId") updateOrderId();
    };

    return () => {
      window.removeEventListener("storage", updateOrderId);
      localStorage.setItem = originalSetItem; // restore default
    };
  }, []);


  const { LeaveModal, InactivityModal, RequestLeave } = useLeaveConfirmation(orderId);

  return (
    <div ref={scrollRef} className="touch-scroll w-full h-screen">
      <div className="sticky top-0 z-50 bg-white">
        <Navbar RequestLeave={RequestLeave} />
      </div>

      <LeaveModal />
      <InactivityModal />

      <div className="p-6 min-h-full">
        <Outlet context={{ RequestLeave }} />
      </div>
    </div>
  );
};

export default App;
