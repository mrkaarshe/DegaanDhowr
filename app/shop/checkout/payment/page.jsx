"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getDeliveryAssignmentDetail } from "@/lib/api/services/delivery";

const Page = () => {
  const searchParams = useSearchParams();
  const [test , setTest] = useState()

  const [deliveryId, setDeliveryId] = useState("");
  const [orderPin, setOrderPin] = useState("");
  const [loading, setLoading] = useState(false);

  // 1. Waxaan abuuraynaa hal State oo lagu keydiyo response-ka oo dhan
  const [apiResponse, setApiResponse] = useState(null);

  useEffect(() => {
    const orderFromUrl = searchParams.get("order");
    if (orderFromUrl) setDeliveryId(orderFromUrl);
  }, [searchParams]);

  const fetchDelivery = async () => {

    try {
      const res = await fetch()
    } catch (error) {
      
    }


    // if (!deliveryId || !orderPin) return;

    // setLoading(true);
    // setApiResponse(null); // Nadiifi xogtii hore inta aan la baarin

    // try {
    //   const res = await getDeliveryAssignmentDetail({
    //     delivery_assignment_id: deliveryId,
    //     order_pin: orderPin,
    //   });

    //   // 2. Ku keydi xogta server-ka ka timid state-ka "apiResponse"
    //   setApiResponse(res);
      
    // } catch (err) {
    //   console.error(err);
    //   // Haddii server-ku dhaco, u samey qaab la mid ah kan API-ga
    //   setApiResponse({
    //     message: { status: false, text: "Xiriirka server-ka waa go'ay." }
    //   });
    // } finally {
    //   setLoading(false);
    // }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchDelivery();
  };


  // Ku dar useEffect si console loo daabaco markasta oo apiResponse isbedelo
useEffect(() => {
  if (apiResponse) {
    console.log("Xogta delivery-ga:", apiResponse);
  }
}, [apiResponse]);

  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        
        {/* Form-ka Baaritaanka */}
        <Card className="max-w-xl mx-auto mb-6 shadow-sm">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">Raadraaca Dalabka</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <Input
                placeholder="Delivery Assignment ID"
                value={deliveryId}
                onChange={(e) => setDeliveryId(e.target.value)}
              />
              <Input
                placeholder="Order PIN"
                value={orderPin}
                onChange={(e) => setOrderPin(e.target.value)}
              />
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold"
                disabled={loading}
              >
                {loading ? "Baarayaa..." : "Track Delivery"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* 3. HALKAN AYAY KUXIRAN TAHAY: Lagu xisaabtami status-ka xogta ku jirta apiResponse */}
        
        {apiResponse && (
          <div className="max-w-xl mx-auto">
            
            {/* HADDII STATUS-KU YAHAY FALSE: Muuji Error-ka */}
            {apiResponse.message?.status === false && (
              <div className="p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded shadow">
                <p className="font-bold">Khalad ayaa dhacay:</p>
                <p>{apiResponse.message?.text || "PIN-ka ama ID-ga aad gelisay waa khaldan yahay."}</p>
              </div>
            )}

            {/* HADDII STATUS-KU YAHAY TRUE: Muuji Xogta Dalabka */}
            {apiResponse.message?.status === true && apiResponse.message?.data && (
              <Card className="shadow-lg border-t-4 border-t-green-500">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-center">
                    Dalabka: {apiResponse.message.data.sales_order}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  
                  <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                    <p><b>Status:</b> <span className="text-green-700 font-semibold">{apiResponse.message.data.order_status}</span></p>
                    <p><b>Goobta:</b> {apiResponse.message.data.district}, {apiResponse.message.data.region}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-3 rounded border border-blue-100">
                      <h3 className="font-bold text-blue-800 border-b mb-2">Macmiilka</h3>
                      <p className="text-sm"><b>Magaca:</b> {apiResponse.message.data.customer?.customer_name}</p>
                      <p className="text-sm"><b>Tel:</b> {apiResponse.message.data.customer?.phone}</p>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded border border-yellow-100">
                      <h3 className="font-bold text-yellow-800 border-b mb-2">Rider-ka</h3>
                      <p className="text-sm"><b>Magaca:</b> {apiResponse.message.data.delivery_person}</p>
                      <p className="text-sm"><b>Tel:</b> {apiResponse.message.data.delivery_number}</p>
                    </div>
                  </div>

                  <div className="border rounded overflow-hidden">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="p-2 border-b">Item-ka</th>
                          <th className="p-2 border-b text-center">Qty</th>
                        </tr>
                      </thead>
                      <tbody>
                        {apiResponse.message.data.items?.map((item, idx) => (
                          <tr key={idx} className="hover:bg-gray-50">
                            <td className="p-2 border-b">{item.item_name}</td>
                            <td className="p-2 border-b text-center">{item.qty}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                </CardContent>
              </Card>
            )}
            
          </div>
        )}
      </div>
    </main>
  );
};

export default Page;