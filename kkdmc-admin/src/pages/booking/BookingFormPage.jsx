import {
    useEffect,
    useState,
  } from "react";
  
  import {
    useNavigate,
  } from "react-router-dom";
  
  import {
    ArrowLeft,
    Save,
  } from "lucide-react";
  
  import { toast }
  from "react-hot-toast";
  
  import AdminLayout
  from "../../layouts/AdminLayout";
  
  import {
    getTourPackages,
  } from "../../services/tourPackageService";
  
  import {
    getOptionsByPackage,
  } from "../../services/packageOptionService";
  
  import {
    createManualBooking,
  } from "../../services/bookingService";
  
  export default function BookingFormPage() {
  
    const navigate =
      useNavigate();
  
    const [loading, setLoading] =
      useState(false);
  
    const [packages, setPackages] =
      useState([]);
  
    const [options, setOptions] =
      useState([]);
  
    const [selectedOption,
      setSelectedOption] =
      useState(null);

      const [selectedPackage,
        setSelectedPackage] =
        useState(null);
  
    const [form, setForm] =
      useState({

        booking_type:
          "package",

        customer_name: "",

        customer_email: "",

        customer_whatsapp: "",

        nationality: "",

        tour_package_id: "",

        package_option_id: "",

        item_name: "",

        item_description: "",

        unit_price: 0,

        travel_date: "",

        guests: 1,

        payment_method:
          "bank_transfer",

        special_request: "",

        admin_notes: "",
      });
  
    useEffect(() => {
      loadPackages();
    }, []);
  
    useEffect(() => {
  
      if (
        !form.tour_package_id
      ) return;
  
      loadOptions();
  
    }, [
      form.tour_package_id
    ]);

    useEffect(() => {

        const pkg =
          packages.find(
            item =>
              item.id ===
              form.tour_package_id
          );
      
        setSelectedPackage(
          pkg || null
        );
      
      }, [
        form.tour_package_id,
        packages
      ]);
  
    useEffect(() => {
  
      const option =
        options.find(
          item =>
            item.id ===
            form.package_option_id
        );
  
      setSelectedOption(
        option || null
      );
  
    }, [
      form.package_option_id,
      options
    ]);
  
    const loadPackages =
      async () => {
  
        try {
  
          const data =
            await getTourPackages();
  
          setPackages(data);
  
        } catch (error) {
  
          console.error(error);
  
        }
  
      };
  
    const loadOptions =
      async () => {
  
        try {
  
          const data =
            await getOptionsByPackage(
              form.tour_package_id
            );
  
          setOptions(data);
  
        } catch (error) {
  
          console.error(error);
  
        }
  
      };
  
    const unitPrice =
      form.booking_type ===
      "manual"
        ? Number(
            form.unit_price || 0
          )
        : Number(
            selectedOption
              ?.price || 0
          );
  
    const totalPrice =
      unitPrice *
      Number(
        form.guests || 0
      );
  
    const handleSubmit =
      async (e) => {
  
        e.preventDefault();
  
        try {
  
          setLoading(true);
  
          const booking =
            await createManualBooking(
              form
            );
  
          toast.success(
            "Booking created"
          );
  
          navigate(
            `/bookings/${booking.id}`
          );
  
        } catch (error) {
  
          console.error(error);
  
          toast.error(
            error.response?.data
              ?.message ||
            "Failed to create booking"
          );
  
        } finally {
  
          setLoading(false);
  
        }
  
      };
  
    return (
  
      <AdminLayout>
  
        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-6"
        >
  
          {/* Header */}
          <div className="flex items-center gap-3">

            <button
                type="button"
                onClick={() =>
                navigate("/bookings")
                }
                className="
                p-2
                rounded-lg
                border
                "
            >
                <ArrowLeft size={18} />
            </button>

            <div>

                <h1 className="
                text-3xl
                font-bold
                ">
                Create Booking
                </h1>

                <p className="text-gray-500">
                Create manual booking for customer
                </p>

            </div>

            </div>

            <div className="
              grid
              grid-cols-1
              lg:grid-cols-3
              gap-6
            ">
                <div className="
              lg:col-span-2
              space-y-6
            ">

      {/* Customer Information */}
      <div className="
        bg-white
        rounded-2xl
        p-6
        shadow-sm
      ">

        <h2 className="
          text-lg
          font-semibold
          mb-4
        ">
          Customer Information
        </h2>

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-4
        ">

          <div>
            <label className="
              block
              text-sm
              font-medium
              mb-2
            ">
              Customer Name
            </label>

            <input
              type="text"
              placeholder="Customer Name"
              value={form.customer_name}
              onChange={(e)=>
                setForm({
                  ...form,
                  customer_name:
                    e.target.value
                })
              }
              className="
                w-full
                border
                rounded-xl
                px-4
                py-3
              "
            />
          </div>
          
          <div>
            <label className="
              block
              text-sm
              font-medium
              mb-2
            ">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Email"
              value={form.customer_email}
              onChange={(e)=>
                setForm({
                  ...form,
                  customer_email:
                    e.target.value
                })
              }
              className="
                w-full
                border
                rounded-xl
                px-4
                py-3
              "
            />
          </div>
          
          <div>
            <label className="
              block
              text-sm
              font-medium
              mb-2
            ">
              Whatsapp Number
            </label>

            <input
              type="text"
              placeholder="Whatsapp"
              value={form.customer_whatsapp}
              onChange={(e)=>
                setForm({
                  ...form,
                  customer_whatsapp:
                    e.target.value
                })
              }
              className="
                w-full
                border
                rounded-xl
                px-4
                py-3
              "
            />
          </div>
          
          <div>
            <label className="
              block
              text-sm
              font-medium
              mb-2
            ">
              Nationality
            </label>

            <input
              type="text"
              placeholder="Nationality"
              value={form.nationality}
              onChange={(e)=>
                setForm({
                  ...form,
                  nationality:
                    e.target.value
                })
              }
              className="
                w-full
                border
                rounded-xl
                px-4
                py-3
              "
            />
          </div>

        </div>

      </div>


      {/* Booking Information */}
      <div className="
        bg-white
        rounded-2xl
        p-6
        shadow-sm
      ">

        <div className="mb-6">

          <label className="
            block
            text-sm
            font-medium
            mb-3
          ">
            Booking Type
          </label>

          <div className="flex gap-6">

            <label className="
              flex
              items-center
              gap-2
            ">
              <input
                type="radio"
                value="package"
                checked={
                  form.booking_type ===
                  "package"
                }
                onChange={(e)=>
                  setForm({
                    ...form,
                    booking_type:
                      e.target.value,
                  })
                }
              />
              Package Booking
            </label>

            <label className="
              flex
              items-center
              gap-2
            ">
              <input
                type="radio"
                value="manual"
                checked={
                  form.booking_type ===
                  "manual"
                }
                onChange={(e)=>
                  setForm({
                    ...form,
                    booking_type:
                      e.target.value,
                  })
                }
              />
              Manual Booking
            </label>

          </div>

        </div>

        <h2 className="
          text-lg
          font-semibold
          mb-4
        ">
          Booking Information
        </h2>

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-4
        ">

          {form.booking_type === "package" && (
            <>
              {/* Select Package */}
              <div>
                <label className="
                  block
                  text-sm
                  font-medium
                  mb-2
                ">
                  Tour Package
                </label>

                <select
                  value={form.tour_package_id}
                  onChange={(e)=>
                    setForm({
                      ...form,
                      tour_package_id:
                        e.target.value,
                      package_option_id:
                        ""
                    })
                  }
                  className="
                    w-full
                    border
                    rounded-xl
                    px-4
                    py-3
                  "
                >
                  <option value="">
                    Select Package
                  </option>

                  {packages.map(pkg => (
                    <option
                      key={pkg.id}
                      value={pkg.id}
                    >
                      {pkg.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Option */}
              <div>
                <label className="
                  block
                  text-sm
                  font-medium
                  mb-2
                ">
                  Package Option
                </label>

                <select
                  value={form.package_option_id}
                  onChange={(e)=>
                    setForm({
                      ...form,
                      package_option_id:
                        e.target.value
                    })
                  }
                  className="
                    w-full
                    border
                    rounded-xl
                    px-4
                    py-3
                  "
                >
                  <option value="">
                    Select Option
                  </option>

                  {options.map(option => (
                    <option
                      key={option.id}
                      value={option.id}
                    >
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          
          {form.booking_type === "manual" && (
        <>
          <div>
            <label className="
              block
              text-sm
              font-medium
              mb-2
            ">
              Booking Item
            </label>

            <input
              type="text"
              value={form.item_name}
              onChange={(e) =>
                setForm({
                  ...form,
                  item_name: e.target.value,
                })
              }
              className="
                w-full
                border
                rounded-xl
                px-4
                py-3
              "
            />
          </div>

          <div>
            <label className="
              block
              text-sm
              font-medium
              mb-2
            ">
              Unit Price (IDR)
            </label>

            <input
              type="number"
              value={form.unit_price}
              onChange={(e) =>
                setForm({
                  ...form,
                  unit_price: e.target.value,
                })
              }
              className="
                w-full
                border
                rounded-xl
                px-4
                py-3
              "
            />
          </div>

          <div className="md:col-span-2">

            <label className="
              block
              text-sm
              font-medium
              mb-2
            ">
              Item Description
            </label>

            <textarea
              rows={3}
              value={form.item_description}
              onChange={(e) =>
                setForm({
                  ...form,
                  item_description:
                    e.target.value,
                })
              }
              className="
                w-full
                border
                rounded-xl
                p-4
              "
            />

          </div>
        </>
      )}
    

    <div>
      <label className="
        block
        text-sm
        font-medium
        mb-2
      ">
        Travel Date
      </label>

      <input
        type="date"
        min={
          new Date()
            .toISOString()
            .split("T")[0]
        }
        value={form.travel_date}
        onChange={(e)=>
          setForm({
            ...form,
            travel_date:
              e.target.value
          })
        }
        className="
          w-full
          border
          rounded-xl
          px-4
          py-3
        "
      />
    </div>

    <div>
      <label className="
        block
        text-sm
        font-medium
        mb-2
      ">
        Number of Guests
      </label>

      <input
        type="number"
        min={
          selectedPackage
            ?.minimum_pax || 1
        }
        max={
          selectedPackage
            ?.maximum_pax || 999
        }
        value={form.guests}
        onChange={(e)=>
          setForm({
            ...form,
            guests:
              e.target.value
          })
        }
        className="
          w-full
          border
          rounded-xl
          px-4
          py-3
        "
      />
    </div>

    {form.booking_type === "package" &&
    selectedPackage && (

    <p className="
      text-sm
      text-gray-500
      mt-2
    ">
      Minimum{" "}
      {
        selectedPackage.minimum_pax
      }{" "}
      guest(s) • Maximum{" "}
      {
        selectedPackage.maximum_pax
      }{" "}
      guest(s)
    </p>

    )}

  </div>

</div>


{/* Payment Information */}
<div className="
  bg-white
  rounded-2xl
  p-6
  shadow-sm
">

  <h2 className="
    text-lg
    font-semibold
    mb-4
  ">
    Payment Information
  </h2>

  <select
    value={
      form.payment_method
    }
    onChange={(e)=>
      setForm({
        ...form,
        payment_method:
          e.target.value
      })
    }
    className="
      w-full
      border
      rounded-xl
      px-4
      py-3
    "
  >
    <option value="cash">
      Cash
    </option>

    <option value="bank_transfer">
      Bank Transfer
    </option>

    <option value="qris">
      QRIS
    </option>

    <option value="wise">
      Wise
    </option>

    <option value="credit_card">
      Credit Card
    </option>

    <option value="paypal">
      PayPal
    </option>

    <option value="other">
      Other
    </option>

  </select>

</div>

{/* Additional Information */}
<div className="
  bg-white
  rounded-2xl
  p-6
  shadow-sm
">

  <h2 className="
    text-lg
    font-semibold
    mb-4
  ">
    Additional Information
  </h2>

  <textarea
    rows={4}
    placeholder="Special Request"
    value={form.special_request}
    onChange={(e)=>
      setForm({
        ...form,
        special_request:
          e.target.value
      })
    }
    className="
      w-full
      border
      rounded-xl
      p-4
      mb-4
    "
  />

  <textarea
    rows={4}
    placeholder="Admin Notes"
    value={form.admin_notes}
    onChange={(e)=>
      setForm({
        ...form,
        admin_notes:
          e.target.value
      })
    }
    className="
      w-full
      border
      rounded-xl
      p-4
    "
  />

</div>

</div>


{/* Summary */}
<div>

  <div className="
    bg-white
    rounded-2xl
    p-6
    shadow-sm
    sticky
    top-6
  ">

    <h2 className="
      text-lg
      font-semibold
      mb-5
    ">
      Booking Summary
    </h2>

    <div className="space-y-4">

      <InfoRow
        label="Unit Price"
        value={`Rp ${Number(
          unitPrice
        ).toLocaleString(
          "id-ID"
        )}`}
      />

      <InfoRow
        label="Guests"
        value={form.guests}
      />

      <InfoRow
        label="Total Price"
        value={`Rp ${Number(
          totalPrice
        ).toLocaleString(
          "id-ID"
        )}`}
      />

    </div>

    <button
      type="submit"
      disabled={loading}
      className="
        w-full
        mt-6
        bg-primary
        text-white
        rounded-xl
        py-3
      "
    >
      {loading
        ? "Creating..."
        : "Create Booking"}
    </button>

  </div>

</div>


</div>
  
{/* Footer */}
          
  
        </form>
  
      </AdminLayout>
  
    );
  
  }

  function InfoRow({
    label,
    value,
  }) {
  
    return (
      <div>
  
        <p className="
          text-sm
          text-gray-500
        ">
          {label}
        </p>
  
        <p className="
          font-semibold
        ">
          {value || "-"}
        </p>
  
      </div>
    );
  
  }