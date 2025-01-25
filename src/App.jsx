import React,{useState , useRef } from 'react';
import { Upload,Camera,Sliders, Sparkles,DollarSign,Rotate3d, Calendar, X} from 'lucide-react';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [brightness,setBrightness] =useState(100);
  const [style,setStyle] = useState('natural');
  const [angle, setAngle] = useState(0);
  const [showBooking, setShowBooking] =useState(false);
  const [processing, setProcessing] = useState(false);
  const [bookingForm, setBookingForm] =useState({
    name:'',
    email: '',
    phone:'',
    date: '',
    time: '',
  });
  const fileInputRef =useRef(null);

  const handleImageUpload = (e)=> {
    const file =e.target.files?.[0];
    if(file){
      setProcessing(true);
      const reader = new FileReader();
      reader.onloadend =()=>{
        setSelectedImage(reader.result);
        // Simulate AI processing
        setTimeout(() =>{
          setProcessing(false);
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver= (e)=> {
    e.preventDefault();
  };

  const handleDrop =(e) =>{
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if(file && file.type.startsWith('image/')) {
      setProcessing(true);
      const reader = new FileReader();
      reader.onloadend = () =>{
        setSelectedImage(reader.result);
        setTimeout(()=> {
          setProcessing(false);
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  const rotateImage= () =>{
    setAngle((prev)=>(prev + 90) %360);
  };

  const handleBookingSubmit =(e) =>{
    e.preventDefault();
    alert('Consultation booked successfully! We will contact you shortly.');
    setShowBooking(false);
    setBookingForm({
      name: '',
      email:'',
      phone: '',
      date: '',
      time:'',
    });
  };

  const styles = [
    { id:'natural',name: 'Natural', price: '100', description: 'Perfect for a subtle enhancement' },
    { id: 'premium', name:'Premium',price: '200', description: 'Ideal for a balanced , refined look' },
    { id: 'luxury', name: 'Luxury', price:'300',description: 'Maxium impact for a stuning transformation' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Sparkles className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">By Harshdeep Khartade</span>
            </div>
            <button 
              onClick={() => setShowBooking(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Book Consultation
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Preview Your New Smile</h2>
              
              <div className="space-y-6">
                {!selectedImage ?(
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-indigo-500 transition-colors"
                    onClick={() =>fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <Upload className="h-12 w-12 mx-auto text-gray-400"/>
                    <p className="mt-2 text-sm text-gray-600">Upload your smile photo</p>
                    <p className="text-xs text-gray-500">or drag and drop</p>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </div>
                ) : (
                  <div className="relative">
                    {processing ?(
                      <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg">
                        <div className="text-center">
                          <Sparkles className="h-8 w-8 text-indigo-600 mx-auto animate-spin" />
                          <p className="mt-2 text-sm text-gray-600">Processing with AI...</p>
                        </div>
                      </div>
                    ) : null}
                    <img 
                      src={selectedImage} 
                      alt="Preview" 
                      className="rounded-lg w-full transition-transform duration-300"
                      style={{ 
                        filter:`brightness(${brightness}%)`,
                        transform: `rotate(${angle}deg)`
                      }}
                    />
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button 
                        className="bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                        onClick={rotateImage}
                      >
                        <Rotate3d className="h-5 w-5 text-gray-700"/>
                      </button>
                      <button 
                        className="bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                        onClick={()=>setSelectedImage(null)}
                      >
                        <Camera className="h-5 w-5 text-gray-700" />
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700">
                      <Sliders className="h-4 w-4 mr-2"/>
                      Brightness
                    </label>
                    <input
                      type="range"
                      min="50"
                      max="150"
                      value={brightness}
                      onChange={(e) => setBrightness(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">AI Enhancement Features</h3>
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <Sparkles className="h-5 w-5 text-indigo-600 mr-3"/>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Real-time 3D Preview</span>
                    <p className="text-xs text-gray-500 mt-1">Advanced AI processing  for realistic results</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <Camera className="h-5 w-5 text-indigo-600 mr-3" />
                  <div>
                    <span className="text-sm font-medium text-gray-700">Multiple Angle  Views</span>
                    <p className="text-xs text-gray-500 mt-1">View your new smile from every angle</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <Sliders className="h-5 w-5 text-indigo-600 mr-3"/>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Customizable  Settings</span>
                    <p className="text-xs text-gray-500 mt-1">Fine-tune your perfect smile</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Choose Your Style</h3>
              <div className="space-y-4">
                {styles.map((styleOption) => (
                  <div
                    key={styleOption.id}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      style === styleOption.id
                        ? 'bg-indigo-50 border-2 border-indigo-500 scale-[1.02]'
                        : 'bg-gray-50 border-2 border-transparent hover:border-indigo-200'
                    }`}
                    onClick={() => setStyle(styleOption.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{styleOption.name}</h4>
                        <p className="text-sm text-gray-500 mt-1">{styleOption.description}</p>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-indigo-600 mr-1" />
                        <span className="font-semibold text-gray-900">{styleOption.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl shadow-lg p-8 text-white">
              <h3 className="text-xl font-semibold mb-4">Ready to Transform Your Smile?</h3>
              <p className="text-indigo-100 mb-6">
                Book a free consultation with our experts to discuss your personalized plan.
              </p>
              <button 
                onClick={() => setShowBooking(true)}
                className="w-full bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Booking Modal */}
      {showBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Book Your Consultation</h3>
              <button 
                onClick={() => setShowBooking(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={bookingForm.name}
                  onChange={(e) =>setBookingForm({...bookingForm, name:e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={bookingForm.email}
                  onChange={(e)=> setBookingForm({...bookingForm, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  required
                  value={bookingForm.phone}
                  onChange={(e) =>setBookingForm({...bookingForm, phone:e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={bookingForm.date}
                    onChange={(e) =>setBookingForm({...bookingForm,date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    required
                    value={bookingForm.time}
                    onChange={(e)=> setBookingForm({...bookingForm, time: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors mt-6"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
