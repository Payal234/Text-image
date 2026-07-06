import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContext } from '../Context/AppContext';

const defaultImage = "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80";

const Result = () => {
  const [image, setImage] = useState(defaultImage);
  const [text, setText] = useState('');
  const [code, setCode] = useState('');
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [activeTab, setActiveTab] = useState('image'); // 'image', 'text', or 'code'
  const [codeLanguage, setCodeLanguage] = useState('');

  const { generateImage, generateText, generateCode } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (input) {
      if (activeTab === 'image') {
        const generatedImage = await generateImage(input);
        if (generatedImage) {
          setIsImageLoaded(true);
          setImage(generatedImage);
        }
      } else if (activeTab === 'text') {
        const generatedText = await generateText(input);
        if (generatedText) {
          setIsImageLoaded(true);
          setText(generatedText);
        }
      } else if (activeTab === 'code') {
        const finalPrompt = codeLanguage && codeLanguage !== 'Custom'
          ? `Language: ${codeLanguage}\nRequirement: ${input}`
          : input;
        const generatedCode = await generateCode(finalPrompt);
        if (generatedCode) {
          setIsImageLoaded(true);
          setCode(generatedCode);
        }
      }
    }
    setLoading(false);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsImageLoaded(false);
    setInput('');
    setImage(defaultImage);
    setText('');
    setCode('');
  };

  return (
    <motion.form
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={onSubmitHandler}
      className="flex flex-col min-h-[90vh] justify-center items-center text-white"
    >
      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6">
        <button
          type="button"
          onClick={() => handleTabChange('image')}
          className={`px-6 py-2 rounded-full transition-all ${
            activeTab === 'image'
              ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-[0_0_15px_rgba(236,72,153,0.5)] scale-105'
              : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
          }`}
        >
          Generate Image
        </button>
        <button
          type="button"
          onClick={() => handleTabChange('text')}
          className={`px-6 py-2 rounded-full transition-all ${
            activeTab === 'text'
              ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-[0_0_15px_rgba(236,72,153,0.5)] scale-105'
              : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
          }`}
        >
          Generate Text
        </button>
        <button
          type="button"
          onClick={() => handleTabChange('code')}
          className={`px-6 py-2 rounded-full transition-all ${
            activeTab === 'code'
              ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-[0_0_15px_rgba(236,72,153,0.5)] scale-105'
              : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
          }`}
        >
          Generate Code
        </button>
      </div>

      <div className="w-full max-w-4xl flex flex-col items-center min-h-[300px]">
        <AnimatePresence mode="wait">
          {/* Display based on active tab */}
          {activeTab === 'image' && (
            <motion.div
              key="image-tab"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="w-full flex justify-center px-4 sm:px-0"
            >
              <div className="relative w-full max-w-sm">
                <img src={image} alt="Generated" className="w-full rounded-xl shadow-2xl border border-white/20" />
                <span
                  className={`absolute bottom-0 left-0 h-1 bg-pink-500 rounded-b-xl ${
                    loading ? 'w-full transition-all duration-[10s]' : 'w-0'
                  }`}
                />
              </div>
            </motion.div>
          )}

          {activeTab === 'text' && (
            <motion.div
              key="text-tab"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {isImageLoaded && text ? (
                <div className="w-full p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-2xl border border-white/20">
                  <pre className="whitespace-pre-wrap text-sm font-sans text-gray-200">{text}</pre>
                </div>
              ) : (
                <div className="w-full max-w-2xl mx-auto h-64 bg-white/5 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/10 shadow-inner">
                  <p className="text-gray-400 animate-pulse">
                    {loading ? 'Crafting your text...' : 'Text will appear here'}
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'code' && (
            <motion.div
              key="code-tab"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {isImageLoaded && code ? (
                <div className="w-full p-6 bg-[#0f172a]/80 backdrop-blur-md rounded-xl shadow-2xl overflow-x-auto border border-white/20">
                  <pre className="text-green-400 text-sm font-mono">{code}</pre>
                </div>
              ) : (
                <div className="w-full h-64 bg-white/5 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/10 shadow-inner">
                  <p className="text-gray-400 animate-pulse">
                    {loading ? 'Writing code...' : 'Code will appear here'}
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!isImageLoaded && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center w-full max-w-xl mt-10 gap-4"
        >
          {activeTab === 'code' && (
            <div className="flex self-start items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl shadow border border-white/20">
              <label className="text-sm font-medium text-gray-200">Language:</label>
              <select 
                value={codeLanguage} 
                onChange={(e) => setCodeLanguage(e.target.value)}
                className="bg-transparent text-sm outline-none cursor-pointer text-white [&>option]:bg-slate-800"
                disabled={loading}
              >
                <option value="">Auto-detect / Custom</option>
                <option value="Python">Python</option>
                <option value="JavaScript">JavaScript</option>
                <option value="React">React (JSX)</option>
                <option value="HTML/CSS">HTML/CSS</option>
                <option value="C++">C++</option>
                <option value="Java">Java</option>
              </select>
            </div>
          )}

          <div className="flex w-full bg-white/10 backdrop-blur-md text-white text-sm p-1 rounded-full shadow-2xl border border-white/20">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder={
                activeTab === 'image'
                  ? "Describe your idea..."
                  : activeTab === 'text'
                  ? "What text content?"
                  : "Describe the code (e.g. 'Build a to-do list')"
              }
              className="flex-1 bg-transparent outline-none ml-4 sm:ml-6 min-w-0 placeholder:text-gray-300"
              disabled={loading}
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition-opacity px-6 sm:px-16 py-3 rounded-full font-medium shadow-lg whitespace-nowrap"
              disabled={loading || !input.trim()}
            >
              Generate
            </button>
          </div>
        </motion.div>
      )}

      {isImageLoaded && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-4 flex-wrap justify-center mt-10"
        >
          <button
            onClick={() => handleTabChange(activeTab)}
            className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-3 rounded-full cursor-pointer hover:bg-white/20 transition-all"
          >
            Generate Another
          </button>
          
          {activeTab === 'image' && (
            <a
              href={image}
              download="generated-image.png"
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white font-medium px-10 py-3 rounded-full cursor-pointer transition-opacity shadow-lg"
            >
              Download Image
            </a>
          )}
          
          {(activeTab === 'text' || activeTab === 'code') && (
            <button
              type="button"
              onClick={() => {
                const content = activeTab === 'text' ? text : code;
                navigator.clipboard.writeText(content);
                alert('Copied to clipboard!');
              }}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white font-medium px-10 py-3 rounded-full cursor-pointer transition-opacity shadow-lg"
            >
              Copy to Clipboard
            </button>
          )}
        </motion.div>
      )}
    </motion.form>
  );
};

export default Result;
