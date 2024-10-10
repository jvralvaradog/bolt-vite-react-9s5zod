import React from 'react'
import { Book, PlusCircle } from 'lucide-react'
import SermonCreator from './components/SermonCreator'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Book className="text-indigo-600 w-8 h-8" />
            <h1 className="text-2xl font-bold text-gray-800">ChurchHelp</h1>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="text-indigo-600 hover:text-indigo-800">Home</a></li>
              <li><a href="#" className="text-indigo-600 hover:text-indigo-800">Sermons</a></li>
              <li><a href="#" className="text-indigo-600 hover:text-indigo-800">Services</a></li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Create a New Sermon</h2>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-indigo-700 transition duration-300">
              <PlusCircle className="w-5 h-5" />
              <span>New Sermon</span>
            </button>
          </div>
          <SermonCreator />
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 ChurchHelp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App