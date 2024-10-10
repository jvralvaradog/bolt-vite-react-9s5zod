import React, { useState } from 'react'
import { Save, PlusCircle, X, FileText, Book, Image, Eye } from 'lucide-react'
import SermonPreview from './SermonPreview'

interface Note {
  id: string
  type: 'note' | 'verse' | 'image'
  content: string
}

interface Sermon {
  title: string
  scripture: string
  notes: Note[]
  date: string
}

const SermonCreator: React.FC = () => {
  const [sermon, setSermon] = useState<Sermon>({
    title: '',
    scripture: '',
    notes: [],
    date: new Date().toISOString().split('T')[0]
  })
  const [showPreview, setShowPreview] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSermon(prev => ({ ...prev, [name]: value }))
  }

  const handleAddNote = (type: 'note' | 'verse' | 'image') => {
    const newNote: Note = {
      id: Date.now().toString(),
      type,
      content: ''
    }
    setSermon(prev => ({ ...prev, notes: [...prev.notes, newNote] }))
  }

  const handleNoteChange = (id: string, content: string) => {
    setSermon(prev => ({
      ...prev,
      notes: prev.notes.map(note =>
        note.id === id ? { ...note, content } : note
      )
    }))
  }

  const handleRemoveNote = (id: string) => {
    setSermon(prev => ({
      ...prev,
      notes: prev.notes.filter(note => note.id !== id)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically save the sermon data to a backend or local storage
    console.log('Sermon saved:', sermon)
    // You can add further logic here, such as clearing the form or showing a success message
  }

  const handleExport = () => {
    const sermonText = `
Title: ${sermon.title}
Scripture: ${sermon.scripture}
Date: ${sermon.date}

${sermon.notes.map(note => {
  switch (note.type) {
    case 'note':
      return `Note: ${note.content}`
    case 'verse':
      return `Verse: ${note.content}`
    case 'image':
      return `Image: ${note.content}`
  }
}).join('\n\n')}
    `.trim()

    const blob = new Blob([sermonText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${sermon.title.replace(/\s+/g, '_')}_sermon.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={sermon.title}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label htmlFor="scripture" className="block text-sm font-medium text-gray-700">Scripture</label>
          <input
            type="text"
            id="scripture"
            name="scripture"
            value={sermon.scripture}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={sermon.date}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Notes</h3>
          {sermon.notes.map((note, index) => (
            <div key={note.id} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={note.content}
                onChange={(e) => handleNoteChange(note.id, e.target.value)}
                className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder={`Enter ${note.type} content`}
              />
              <button
                type="button"
                onClick={() => handleRemoveNote(note.id)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => handleAddNote('note')}
              className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition duration-300"
            >
              <PlusCircle className="w-5 h-5 inline-block mr-1" /> Note
            </button>
            <button
              type="button"
              onClick={() => handleAddNote('verse')}
              className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition duration-300"
            >
              <Book className="w-5 h-5 inline-block mr-1" /> Verse
            </button>
            <button
              type="button"
              onClick={() => handleAddNote('image')}
              className="bg-purple-500 text-white px-3 py-1 rounded-md hover:bg-purple-600 transition duration-300"
            >
              <Image className="w-5 h-5 inline-block mr-1" /> Image
            </button>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center justify-center space-x-2 hover:bg-indigo-700 transition duration-300"
          >
            <Save className="w-5 h-5" />
            <span>Save Sermon</span>
          </button>
          <button
            type="button"
            onClick={handleExport}
            className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center justify-center space-x-2 hover:bg-green-700 transition duration-300"
          >
            <FileText className="w-5 h-5" />
            <span>Export</span>
          </button>
          <button
            type="button"
            onClick={() => setShowPreview(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center justify-center space-x-2 hover:bg-blue-700 transition duration-300"
          >
            <Eye className="w-5 h-5" />
            <span>Preview</span>
          </button>
        </div>
      </form>
      {showPreview && (
        <SermonPreview sermon={sermon} onClose={() => setShowPreview(false)} />
      )}
    </>
  )
}

export default SermonCreator