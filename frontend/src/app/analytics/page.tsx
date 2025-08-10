'use client'
import React, { useState, useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, MapPin, TrendingUp, AlertTriangle, FileText, Users, Clock, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Sample FIR data with analytics focus
const analyticsData = [
  {
    id: '1',
    firNumber: '145/2025',
    policeStation: 'Connaught Place',
    district: 'New Delhi',
    area: 'Central Delhi',
    date: '2025-08-10',
    month: '2025-08',
    complainType: 'Theft',
    category: 'Property Crime',
    sections: ['379 IPC'],
    status: 'Under Investigation',
    priority: 'Medium'
  },
  {
    id: '2',
    firNumber: '146/2025',
    policeStation: 'Karol Bagh',
    district: 'New Delhi',
    area: 'Central Delhi',
    date: '2025-08-11',
    month: '2025-08',
    complainType: 'Molestation',
    category: 'Crime Against Women',
    sections: ['354 IPC'],
    status: 'Active',
    priority: 'High'
  },
  {
    id: '3',
    firNumber: '147/2025',
    policeStation: 'Rohini',
    district: 'North West Delhi',
    area: 'North Delhi',
    date: '2025-08-09',
    month: '2025-08',
    complainType: 'Burglary',
    category: 'Property Crime',
    sections: ['380 IPC'],
    status: 'Closed',
    priority: 'Medium'
  },
  {
    id: '4',
    firNumber: '148/2025',
    policeStation: 'Lajpat Nagar',
    district: 'South East Delhi',
    area: 'South Delhi',
    date: '2025-08-08',
    month: '2025-08',
    complainType: 'Assault',
    category: 'Violent Crime',
    sections: ['323 IPC'],
    status: 'Under Investigation',
    priority: 'High'
  },
  {
    id: '5',
    firNumber: '149/2025',
    policeStation: 'Dwarka',
    district: 'South West Delhi',
    area: 'West Delhi',
    date: '2025-08-07',
    month: '2025-08',
    complainType: 'Fraud',
    category: 'Economic Crime',
    sections: ['420 IPC'],
    status: 'Active',
    priority: 'Medium'
  },
  {
    id: '6',
    firNumber: '150/2025',
    policeStation: 'Connaught Place',
    district: 'New Delhi',
    area: 'Central Delhi',
    date: '2025-07-30',
    month: '2025-07',
    complainType: 'Theft',
    category: 'Property Crime',
    sections: ['379 IPC'],
    status: 'Closed',
    priority: 'Low'
  },
  {
    id: '7',
    firNumber: '151/2025',
    policeStation: 'Rohini',
    district: 'North West Delhi',
    area: 'North Delhi',
    date: '2025-07-28',
    month: '2025-07',
    complainType: 'Drug Possession',
    category: 'Drug Crime',
    sections: ['20 NDPS Act'],
    status: 'Under Investigation',
    priority: 'High'
  },
  {
    id: '8',
    firNumber: '152/2025',
    policeStation: 'Karol Bagh',
    district: 'New Delhi',
    area: 'Central Delhi',
    date: '2025-07-25',
    month: '2025-07',
    complainType: 'Dowry Harassment',
    category: 'Crime Against Women',
    sections: ['498A IPC'],
    status: 'Active',
    priority: 'High'
  }
];

const FIRAnalytics = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('3months');
  const [selectedArea, setSelectedArea] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter data based on selections
  const filteredData = useMemo(() => {
    let filtered = [...analyticsData];

    // Time range filter
    const now = new Date();
    const startDate = new Date();
    switch (selectedTimeRange) {
      case '1month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case '3months':
        startDate.setMonth(now.getMonth() - 3);
        break;
      case '6months':
        startDate.setMonth(now.getMonth() - 6);
        break;
      case '1year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
    }

    filtered = filtered.filter(item => new Date(item.date) >= startDate);

    // Area filter
    if (selectedArea !== 'All') {
      filtered = filtered.filter(item => item.area === selectedArea);
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    return filtered;
  }, [selectedTimeRange, selectedArea, selectedCategory]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = filteredData.length;
    const active = filteredData.filter(item => item.status === 'Active').length;
    const underInvestigation = filteredData.filter(item => item.status === 'Under Investigation').length;
    const closed = filteredData.filter(item => item.status === 'Closed').length;
    const highPriority = filteredData.filter(item => item.priority === 'High').length;

    return { total, active, underInvestigation, closed, highPriority };
  }, [filteredData]);

  // Location-based data
  const locationData = useMemo(() => {
    const locationMap = {};
    filteredData.forEach(item => {
      const key = item.policeStation;
      locationMap[key] = (locationMap[key] || 0) + 1;
    });
    return Object.entries(locationMap).map(([station, count]) => ({
      station,
      count,
      name: station
    }));
  }, [filteredData]);

  // Complaint type data
  const complaintTypeData = useMemo(() => {
    const typeMap = {};
    filteredData.forEach(item => {
      const key = item.complainType;
      typeMap[key] = (typeMap[key] || 0) + 1;
    });
    return Object.entries(typeMap).map(([type, count]) => ({
      type,
      count,
      name: type
    }));
  }, [filteredData]);

  // Category distribution
  const categoryData = useMemo(() => {
    const categoryMap = {};
    filteredData.forEach(item => {
      const key = item.category;
      categoryMap[key] = (categoryMap[key] || 0) + 1;
    });
    return Object.entries(categoryMap).map(([category, count]) => ({
      category,
      count,
      name: category
    }));
  }, [filteredData]);

  // Timeline data (monthly)
  const timelineData = useMemo(() => {
    const monthMap = {};
    filteredData.forEach(item => {
      const month = item.month;
      monthMap[month] = (monthMap[month] || 0) + 1;
    });
    return Object.entries(monthMap)
      .map(([month, count]) => ({
        month: new Date(month + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        count,
        name: month
      }))
      .sort((a, b) => new Date(a.name + '-01') - new Date(b.name + '-01'));
  }, [filteredData]);

  // Trend analysis
  const trendAnalysis = useMemo(() => {
    const trends = [];
    
    // Most common complaint type
    const topComplaint = complaintTypeData.reduce((max, item) => 
      item.count > max.count ? item : max, complaintTypeData[0] || { type: 'None', count: 0 });
    
    // Area with most cases
    const topArea = locationData.reduce((max, item) => 
      item.count > max.count ? item : max, locationData[0] || { station: 'None', count: 0 });

    trends.push({
      title: 'Most Common Crime',
      value: topComplaint.type,
      count: topComplaint.count,
      trend: 'up',
      color: 'text-red-600'
    });

    trends.push({
      title: 'Hotspot Area',
      value: topArea.station,
      count: topArea.count,
      trend: 'up',
      color: 'text-orange-600'
    });

    return trends;
  }, [complaintTypeData, locationData]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">FIR Analytics Dashboard</h1>
        <p className="text-gray-600">Analyze crime patterns, trends, and statistics</p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
          <CardDescription>Filter data by time range, area, and crime category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Time Range</label>
              <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">Last Month</SelectItem>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Area</label>
              <Select value={selectedArea} onValueChange={setSelectedArea}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Areas</SelectItem>
                  <SelectItem value="Central Delhi">Central Delhi</SelectItem>
                  <SelectItem value="North Delhi">North Delhi</SelectItem>
                  <SelectItem value="South Delhi">South Delhi</SelectItem>
                  <SelectItem value="West Delhi">West Delhi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Crime Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Categories</SelectItem>
                  <SelectItem value="Property Crime">Property Crime</SelectItem>
                  <SelectItem value="Violent Crime">Violent Crime</SelectItem>
                  <SelectItem value="Crime Against Women">Crime Against Women</SelectItem>
                  <SelectItem value="Economic Crime">Economic Crime</SelectItem>
                  <SelectItem value="Drug Crime">Drug Crime</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total FIRs</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Cases</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Under Investigation</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.underInvestigation}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Closed Cases</p>
                <p className="text-2xl font-bold text-gray-600">{stats.closed}</p>
              </div>
              <Users className="h-8 w-8 text-gray-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">High Priority</p>
                <p className="text-2xl font-bold text-red-600">{stats.highPriority}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trend Analysis */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Key Trends</CardTitle>
          <CardDescription>Important patterns and insights from the data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trendAnalysis.map((trend, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{trend.title}</p>
                  <p className="text-lg font-semibold">{trend.value}</p>
                  <Badge variant="secondary" className="mt-1">
                    {trend.count} cases
                  </Badge>
                </div>
                <TrendingUp className={`h-6 w-6 ${trend.color}`} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Timeline Chart */}
        <Card>
          <CardHeader>
            <CardTitle>FIR Timeline</CardTitle>
            <CardDescription>Monthly trend of registered FIRs</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#0088FE" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Location Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Cases by Police Station</CardTitle>
            <CardDescription>Distribution across different police stations</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={locationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="station" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Complaint Types */}
        <Card>
          <CardHeader>
            <CardTitle>Complaint Types</CardTitle>
            <CardDescription>Breakdown by type of complaint</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={complaintTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {complaintTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Crime Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Crime Categories</CardTitle>
            <CardDescription>Cases grouped by crime category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="category" type="category" width={150} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#FF8042" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FIRAnalytics;