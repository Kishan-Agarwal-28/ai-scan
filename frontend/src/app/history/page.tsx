'use client'

import React, { useState, useMemo } from 'react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  User, 
  FileText, 
  Phone, 
  Clock,
  ChevronDown,
  Eye,
  Download,
  Edit
} from 'lucide-react'

// Type definitions
interface FIRData {
  id: string
  firNumber: string
  policeStation: string
  district: string
  dateTime: string
  complainantName: string
  complainantFather: string
  complainantAddress: string
  complainantPhone: string
  occurrenceDate: string
  occurrenceTime: string
  informationType: 'Written' | 'Oral'
  placeOfOccurrence: string
  sections: string[]
  accusedDetails: string
  briefFacts: string
  actionTaken: string
  officerInCharge: string
  status: 'Active' | 'Under Investigation' | 'Closed' | 'Pending'
}

// Sample data
const sampleFIRs: FIRData[] = [
  {
    id: '1',
    firNumber: '145/2025',
    policeStation: 'Connaught Place Police Station',
    district: 'New Delhi',
    dateTime: '10/08/2025 at 11:45 AM',
    complainantName: 'Ravi Kumar',
    complainantFather: 'Sh. Mahesh Kumar',
    complainantAddress: '24-B, Lajpat Nagar, New Delhi – 110024',
    complainantPhone: '9876543210',
    occurrenceDate: '09/08/2025',
    occurrenceTime: 'Between 8:30 PM and 9:15 PM',
    informationType: 'Written',
    placeOfOccurrence: 'Near Gate No. 3, Rajiv Chowk Metro Station, New Delhi',
    sections: ['Section 379 IPC – Theft', 'Section 356 IPC – Assault or criminal force in attempt to commit theft'],
    accusedDetails: 'Unknown person, approx. 5\'7", wearing a black hoodie and jeans, fled towards Palika Bazaar',
    briefFacts: 'On 09/08/2025, at around 8:45 PM, while I was exiting Rajiv Chowk Metro Station through Gate No. 3, an unknown person suddenly snatched my mobile phone (iPhone 14 Pro, black color) from my hand and ran away.',
    actionTaken: 'Case registered and investigation has been taken up. Assigned to SI Suresh Meena.',
    officerInCharge: 'Inspector Rajesh Singh',
    status: 'Under Investigation'
  },
  // Add more sample data here for demonstration
  {
    id: '2',
    firNumber: '146/2025',
    policeStation: 'Karol Bagh Police Station',
    district: 'New Delhi',
    dateTime: '11/08/2025 at 02:30 PM',
    complainantName: 'Priya Sharma',
    complainantFather: 'Sh. Rajesh Sharma',
    complainantAddress: '15-A, Karol Bagh, New Delhi – 110005',
    complainantPhone: '9876543211',
    occurrenceDate: '10/08/2025',
    occurrenceTime: 'Around 10:00 PM',
    informationType: 'Written',
    placeOfOccurrence: 'Ajmal Khan Road, Karol Bagh, New Delhi',
    sections: ['Section 354 IPC – Assault on woman with intent to outrage her modesty'],
    accusedDetails: 'Known person - Rohit Verma, age 28, resident of Karol Bagh',
    briefFacts: 'The accused person misbehaved and made inappropriate comments while I was returning from work.',
    actionTaken: 'Case registered. Investigation in progress.',
    officerInCharge: 'Inspector Meera Devi',
    status: 'Active'
  }
]

const FIRHistoryComponent = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<keyof FIRData>('dateTime')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [filterStatus, setFilterStatus] = useState<string>('All')
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  // Filter and sort logic
  const filteredAndSortedFIRs = useMemo(() => {
    let filtered = sampleFIRs.filter(fir => {
      const matchesSearch = Object.values(fir).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
      const matchesStatus = filterStatus === 'All' || fir.status === filterStatus
      return matchesSearch && matchesStatus
    })

    return filtered.sort((a, b) => {
      let aValue = a[sortBy]
      let bValue = b[sortBy]
      
      if (Array.isArray(aValue)) aValue = aValue.join(', ')
      if (Array.isArray(bValue)) bValue = bValue.join(', ')
      
      const comparison = aValue.toString().localeCompare(bValue.toString())
      return sortOrder === 'asc' ? comparison : -comparison
    })
  }, [searchTerm, sortBy, sortOrder, filterStatus])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 border-green-200'
      case 'Under Investigation': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Closed': return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'Pending': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const toggleCardExpansion = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id)
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">FIR History</h1>
        <p className="text-gray-600">Manage and search through First Information Reports</p>
      </div>

      {/* Search and Filter Controls */}
      <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search FIRs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Under Investigation">Under Investigation</option>
            <option value="Closed">Closed</option>
            <option value="Pending">Pending</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as keyof FIRData)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="dateTime">Date & Time</option>
            <option value="firNumber">FIR Number</option>
            <option value="complainantName">Complainant Name</option>
            <option value="policeStation">Police Station</option>
            <option value="status">Status</option>
          </select>

          {/* Sort Order */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing {filteredAndSortedFIRs.length} of {sampleFIRs.length} FIRs
        </p>
      </div>

      {/* FIR Cards */}
      <div className="space-y-4">
        {filteredAndSortedFIRs.map((fir) => (
          <div key={fir.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            {/* Card Header */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">FIR #{fir.firNumber}</h3>
                    <p className="text-sm text-gray-500">{fir.policeStation}</p>
                  </div>
                  <Badge className={`${getStatusColor(fir.status)} border`}>
                    {fir.status}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleCardExpansion(fir.id)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <ChevronDown 
                      className={`h-4 w-4 transition-transform ${expandedCard === fir.id ? 'rotate-180' : ''}`} 
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Card Content - Always Visible */}
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Filed On</p>
                    <p className="text-sm font-medium">{fir.dateTime}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Complainant</p>
                    <p className="text-sm font-medium">{fir.complainantName}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-sm font-medium">{fir.district}</p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-1">Sections Applied</p>
                <div className="flex flex-wrap gap-1">
                  {fir.sections.map((section, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {section.split(' – ')[0]}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Expanded Content */}
            {expandedCard === fir.id && (
              <div className="px-4 pb-4 border-t border-gray-100">
                <div className="pt-4 space-y-4">
                  {/* Complainant Details */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Complainant Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Father's Name:</span>
                        <span className="ml-2 font-medium">{fir.complainantFather}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Phone:</span>
                        <span className="ml-2 font-medium">{fir.complainantPhone}</span>
                      </div>
                      <div className="md:col-span-2">
                        <span className="text-gray-500">Address:</span>
                        <span className="ml-2 font-medium">{fir.complainantAddress}</span>
                      </div>
                    </div>
                  </div>

                  {/* Occurrence Details */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Occurrence Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Date:</span>
                        <span className="ml-2 font-medium">{fir.occurrenceDate}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Time:</span>
                        <span className="ml-2 font-medium">{fir.occurrenceTime}</span>
                      </div>
                      <div className="md:col-span-2">
                        <span className="text-gray-500">Place:</span>
                        <span className="ml-2 font-medium">{fir.placeOfOccurrence}</span>
                      </div>
                    </div>
                  </div>

                  {/* Case Details */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Case Details</h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-gray-500">Brief Facts:</span>
                        <p className="mt-1 text-gray-900">{fir.briefFacts}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Accused Details:</span>
                        <p className="mt-1 text-gray-900">{fir.accusedDetails}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Action Taken:</span>
                        <p className="mt-1 text-gray-900">{fir.actionTaken}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Officer-in-Charge:</span>
                        <span className="ml-2 font-medium">{fir.officerInCharge}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-4 border-t border-gray-100">
                    <button className="flex items-center space-x-1 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors">
                      <Eye className="h-4 w-4" />
                      <span>View Full</span>
                    </button>
                    <button className="flex items-center space-x-1 px-3 py-2 text-sm bg-green-50 text-green-600 rounded-md hover:bg-green-100 transition-colors">
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </button>
                    <button className="flex items-center space-x-1 px-3 py-2 text-sm bg-gray-50 text-gray-600 rounded-md hover:bg-gray-100 transition-colors">
                      <Edit className="h-4 w-4" />
                      <span>Edit</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredAndSortedFIRs.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No FIRs found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or filters</p>
        </div>
      )}
    </div>
  )
}

export default FIRHistoryComponent