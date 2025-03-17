import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import 'leaflet/dist/leaflet.css';
import { reportPothole } from '../services/potholeService';

import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const center = [12.9716, 77.5946]; // Default location (Bangalore example)

 const ReportPothole = () => {
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [marker, setMarker] = useState(null);

  // Map click handler
  function LocationMarker() {
    useMapEvents({
      click(e) {
        setMarker([e.latlng.lat, e.latlng.lng]);
        setValue('latitude', e.latlng.lat);
        setValue('longitude', e.latlng.lng);
      },
    });

    return marker ? <Marker position={marker}></Marker> : null;
  }

  // Image preview handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue('image', file);
    }
  };

  // Form submission
  const onSubmit = async (data) => {
    if (!data.image) {
      toast.error('Please upload an image!');
      return;
    }

    const formData = new FormData();
    formData.append('description', data.description);
    formData.append('latitude', data.latitude);
    formData.append('longitude', data.longitude);
    formData.append('severity', data.severity);
    formData.append('image', data.image);
    formData.append('reported_by',data.req.user.id)

    try {
      await reportPothole(formData);
      toast.success('Pothole reported successfully!');
      reset();
      setImagePreview(null);
      setMarker(null);
    } catch (error) {
      console.error(error);
      toast.error('Failed to report pothole. Try again!');
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-3xl font-bold text-center text-green-600 mb-6">Report a Pothole</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            {/* Description */}
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">Description</label>
              <textarea
                {...register('description', { required: 'Description is required' })}
                placeholder="Describe the pothole..."
                rows="3"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>

            {/* Severity */}
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">Severity</label>
              <select
                {...register('severity', { required: 'Please select severity' })}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <option value="">Select severity</option>
                <option value="Low">Low - Minor issue</option>
                <option value="Medium">Medium - Needs attention</option>
                <option value="High">High - Dangerous</option>
              </select>
              {errors.severity && <p className="text-red-500 text-sm">{errors.severity.message}</p>}
            </div>

            {/* Map Location Picker */}
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">Location (Click on Map)</label>
              <MapContainer center={center} zoom={15} style={{ height: '300px', width: '100%' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                <LocationMarker />
              </MapContainer>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="mt-4 w-full h-56 object-cover rounded-lg border" />
              )}
            </div>

            {/* Hidden fields for lat and lng */}
            <input type="hidden" {...register('latitude', { required: 'Latitude is required' })} />
            <input type="hidden" {...register('longitude', { required: 'Longitude is required' })} />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white p-3 rounded-lg font-bold text-lg hover:bg-green-700 transition"
            >
              Submit Report
            </button>
          </form>
        </div>
      </div>
    </>
  );
};


export default ReportPothole;