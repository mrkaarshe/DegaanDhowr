"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Package, 
  User, 
  Truck, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  Search,
  Phone
} from "lucide-react";

const Page = () => {
  const searchParams = useSearchParams();
  const [deliveryId, setDeliveryId] = useState("");
  const [orderPin, setOrderPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [delivery, setDelivery] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const orderFromUrl = searchParams.get("order");
    if (orderFromUrl) setDeliveryId(orderFromUrl);
  }, [searchParams]);

  const fetchDelivery = async () => {
    if (!deliveryId || !orderPin) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/method/degaan_shop.degaan_shop.api.delivery.get_delivery_assignment_detail",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            delivery_assignment_id: deliveryId,
            order_pin: orderPin,
          }),
        }
      );

      const data = await res.json();
      
      if (data?.message?.status === true) {
        setDelivery(data.message.data);
      } else {
        setError(data?.message?.message || "Invalid Delivery ID or PIN");
      }
    } catch (err) {
      setError("Unable to connect to the server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[80ch] bg-[#f8fafc] py-32 px-4 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">DegaanDhowr <span className="text-green-500">Delivery</span></h1>
          <p className="text-slate-500 mt-2 font-medium">Real-time order tracking and status updates</p>
        </div>

        {/* SEARCH CARD - Visible only if no delivery is loaded */}
        {!delivery && (
          <Card className="border-none shadow-xl bg-white/90 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-bold">
                <Search className="w-5 h-5 text-green-600" />
                Track Your Order
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => { e.preventDefault(); fetchDelivery(); }} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Delivery Assignment ID</label>
                  <Input
                    className="h-12 border-slate-200 focus:ring-2 focus:ring-green-500"
                    placeholder="e.g., SAL-ORD-2026-XXXX"
                    value={deliveryId}
                    onChange={(e) => setDeliveryId(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Order PIN</label>
                  <Input
                    type="password"
                    className="h-12 border-slate-200 focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your 4-6 digit PIN"
                    value={orderPin}
                    onChange={(e) => setOrderPin(e.target.value)}
                  />
                </div>
                <Button
                  className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-bold transition-all"
                  disabled={loading}
                >
                  {loading ? "Verifying Details..." : "Track My Order"}
                </Button>
              </form>
              
              {error && (
                <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg flex items-center gap-2 text-sm font-bold border border-red-100">
                  <AlertCircle className="w-4 h-4" /> {error}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* MODERN RESULT CARD - Visible only if delivery is verified */}
        {delivery && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="border-none shadow-xl overflow-hidden">
              {/* Status Banner */}
              <div className="bg-gradient-to-r from-green-600 to-emerald-500 p-6 text-white text-center relative">
                <div className="absolute top-4 right-4 bg-white/20 p-2 rounded-full">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <p className="text-green-100 text-xs font-bold uppercase tracking-widest">Order Verified</p>
                <h2 className="text-2xl font-black mt-1">{delivery.sales_order}</h2>
                <div className="mt-4 inline-block bg-white text-green-700 px-6 py-1.5 rounded-full text-xs font-black shadow-md uppercase">
                  {delivery.order_status}
                </div>
              </div>

              <CardContent className="p-6 space-y-6 bg-white">
                
                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Customer Info */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-sm transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><User className="w-5 h-5" /></div>
                      <h3 className="font-bold text-slate-800 tracking-tight">Customer</h3>
                    </div>
                    <p className="text-slate-900 font-bold">{delivery.customer?.customer_name || delivery.customer?.name}</p>
                    <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
                      <Phone className="w-3 h-3" /> {delivery.customer?.phone}
                    </div>
                  </div>

                  {/* Rider Info */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-sm transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg"><Truck className="w-5 h-5" /></div>
                      <h3 className="font-bold text-slate-800 tracking-tight">Delivery Rider</h3>
                    </div>
                    <p className="text-slate-900 font-bold">{delivery.delivery_person}</p>
                    <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
                      <Phone className="w-3 h-3" /> {delivery.delivery_number}
                    </div>
                  </div>
                </div>

                {/* Location Section */}
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="p-2 bg-purple-100 text-purple-600 rounded-lg"><MapPin className="w-5 h-5" /></div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">Delivery Location</h3>
                    <p className="text-slate-600 text-sm font-semibold">{delivery.district}, {delivery.region}</p>
                  </div>
                </div>

                {/* Items List */}
                <div className="pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                      <Package className="w-5 h-5 text-slate-400" /> Package Contents
                    </h3>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-md font-black uppercase">
                      {delivery.items?.length || 0} Items
                    </span>
                  </div>
                  <div className="space-y-2">
                    {delivery.items?.map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-slate-50 bg-slate-50/50">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-xs font-black text-slate-400">
                            {i + 1}
                          </div>
                          <span className="text-slate-700 font-semibold">{item.item_name}</span>
                        </div>
                        <span className="font-black text-slate-900 text-sm bg-slate-200/50 px-2 py-1 rounded-md">x{item.qty}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full mt-4 border-slate-200 text-slate-500 font-bold hover:bg-slate-50 transition-colors"
                  onClick={() => setDelivery(null)}
                >
                  Track Another Package
                </Button>

              </CardContent>
            </Card>
          </div>
        )}

      </div>
    </main>
  );
};

export default Page;