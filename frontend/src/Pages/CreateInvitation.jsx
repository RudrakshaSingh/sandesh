import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Navbar from '../Component/Layout/Navbar';
import { PenTool, Image, Type, Video, Palette, Download, Save } from 'lucide-react';
import Footer from '../Component/Layout/Footer';

const CreateInvitation = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('blank');

  return (
    <DndProvider backend={HTML5Backend}>
      <Navbar/>
      <div className="min-h-screen bg-neutral-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Your Invitation</h1>
            <p className="text-gray-600">Customize every detail to make it uniquely yours</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Tools Panel */}
            <div className="lg:col-span-3 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Design Tools</h2>
              
              {/* Tool Categories */}
              <div className="space-y-6">
                {/* Templates */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Templates</h3>
                  <select 
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2"
                  >
                    <option value="blank">Blank Canvas</option>
                    <option value="wedding">Wedding</option>
                    <option value="birthday">Birthday</option>
                    <option value="festival">Festival</option>
                  </select>
                </div>

                {/* Elements */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Elements</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { icon: Type, label: 'Text' },
                      { icon: Image, label: 'Image' },
                      { icon: PenTool, label: 'Shape' },
                      { icon: Video, label: 'Video' }
                    ].map((tool, index) => (
                      <button
                        key={index}
                        className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-orange-50 hover:border-orange-300 transition"
                      >
                        <tool.icon className="h-6 w-6 text-gray-600 mb-2" />
                        <span className="text-sm text-gray-700">{tool.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    <div className="flex items-center">
                      <Palette className="h-4 w-4 mr-2" />
                      Colors
                    </div>
                  </h3>
                  <div className="grid grid-cols-6 gap-2">
                    {[
                      '#FF5733', '#FFC300', '#DAF7A6',
                      '#C70039', '#900C3F', '#581845'
                    ].map((color, index) => (
                      <button
                        key={index}
                        className="w-8 h-8 rounded-full border-2 border-white shadow-sm hover:scale-110 transition"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Canvas Area */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-lg shadow-md p-6 min-h-[600px] border-2 border-dashed border-gray-300 flex items-center justify-center">
                <p className="text-gray-500 text-center">
                  Drag and drop elements here to start designing
                </p>
              </div>
            </div>

            {/* Preview & Settings */}
            <div className="lg:col-span-3 space-y-6">
              {/* Preview */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Preview</h2>
                <div className="aspect-[3/4] bg-gray-100 rounded-lg mb-4"></div>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition">
                    <Save className="h-5 w-5" />
                    Save Design
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 border border-orange-600 text-orange-600 px-4 py-2 rounded-md hover:bg-orange-50 transition">
                    <Download className="h-5 w-5" />
                    Download
                  </button>
                </div>
              </div>

              {/* Settings */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Canvas Size
                    </label>
                    <select className="w-full border border-gray-300 rounded-md p-2">
                      <option>Instagram Post (1:1)</option>
                      <option>Story (9:16)</option>
                      <option>Landscape (16:9)</option>
                      <option>Custom</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Background
                    </label>
                    <select className="w-full border border-gray-300 rounded-md p-2">
                      <option>Solid Color</option>
                      <option>Gradient</option>
                      <option>Image</option>
                      <option>Pattern</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </DndProvider>
  );
};

export default CreateInvitation;