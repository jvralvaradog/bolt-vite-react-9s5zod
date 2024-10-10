import React from 'react'
import { X } from 'lucide-react'

interface SermonPreviewProps {
  sermon: {
    title: string
    scripture: string
    notes: Array<{
      id: string
      type: 'note' | 'verse' | 'image'
      content: string
    }>
    date: string
  }
  onClose: () => void
}

const SermonPreview: React.FC<SermonPreviewProps> = ({ sermon, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Sermon Preview</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">{sermon.title}</h3>
          <p className="text-gray-600">Scripture: {sermon.scripture}</p>
          <p className="text-gray-600">Date: {sermon.date}</p>
          <div className="space-y-2">
            {sermon.notes.map((note, index) => (
              <div key={note.id} className="border-l-4 border-indigo-500 pl-4">
                {note.type === 'note' && (
                  <p className="text-gray-800">{note.content}</p>
                )}
                {note.type === 'verse' && (
                  <p className="text-green-600 font-semibold">{note.content}</p>
                )}
                {note.type === 'image' && (
                  <img src={note.content} alt={`Sermon image ${index + 1}`} className="max-w-full h-auto" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SermonPreview