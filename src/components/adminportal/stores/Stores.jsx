import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Search } from "lucide-react";
import Pagination from "@/components/adminportal/adminsidebar/Pagination";
import { Input } from "@/components/ui/input";

const storesData = [
  {
    id: 1,
    name: "The Trendy Tee",
    owner: "John Doe",
    products: 120,
    sales: 5400,
    status: "approved",
  },
  {
    id: 2,
    name: "Vintage Finds",
    owner: "Jane Smith",
    products: 75,
    sales: 3200,
    status: "pending",
  },
  {
    id: 3,
    name: "Crafty Creations",
    owner: "Mike Johnson",
    products: 200,
    sales: 8900,
    status: "approved",
  },
  {
    id: 4,
    name: "Gadget World",
    owner: "Emily White",
    products: 300,
    sales: 15000,
    status: "rejected",
  },
  {
    id: 5,
    name: "Book Nook",
    owner: "David Green",
    products: 500,
    sales: 25000,
    status: "approved",
  },
];

const chartData = [
  { name: "Jan", stores: 4, sales: 2400 },
  { name: "Feb", stores: 3, sales: 1398 },
  { name: "Mar", stores: 2, sales: 9800 },
  { name: "Apr", stores: 2, sales: 3908 },
  { name: "May", stores: 1, sales: 4800 },
  { name: "Jun", stores: 2, sales: 3800 },
  { name: "Jul", stores: 4, sales: 4300 },
];

const Stores = ({ onRowClick }) => {
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const storesPerPage = 5;

  const filteredStores = storesData.filter(
    (store) =>
      store.name.toLowerCase().includes(filter.toLowerCase()) ||
      store.owner.toLowerCase().includes(filter.toLowerCase())
  );

  const indexOfLastStore = currentPage * storesPerPage;
  const indexOfFirstStore = indexOfLastStore - storesPerPage;
  const currentStores = filteredStores.slice(
    indexOfFirstStore,
    indexOfLastStore
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="space-y-8">
      {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>New Stores Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="stores" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sales Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{storesData.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Stores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {storesData.filter((s) => s.status === "pending").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Approved Stores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {storesData.filter((s) => s.status === "approved").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Rejected Stores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {storesData.filter((s) => s.status === "rejected").length}
            </div>
          </CardContent>
        </Card>
      </div> */}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Stores</CardTitle>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Filter stores..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Store Name</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Sales</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentStores.map((store) => (
                <TableRow key={store.id}>
                  <TableCell>{store.name}</TableCell>
                  <TableCell>{store.owner}</TableCell>
                  <TableCell>{store.products}</TableCell>
                  <TableCell>${store.sales.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        store.status === "approved"
                          ? "default"
                          : store.status === "pending"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {store.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Store</DropdownMenuItem>
                        <DropdownMenuItem>Approve</DropdownMenuItem>
                        <DropdownMenuItem>Reject</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <Pagination
          itemsPerPage={storesPerPage}
          totalItems={filteredStores.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </Card>
    </div>
  );
};

export default Stores;
