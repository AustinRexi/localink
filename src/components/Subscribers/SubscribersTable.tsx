import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import React from "react";

interface SubscriberUser {
  name: string;
  age: number;
  gender: string;
  location: string;
  status: string;
  // lasActive: Date;
  lasActive: string;
}

const subscribers: SubscriberUser[] = [
  {
    name: "Alex Marshall",
    age: 34,
    gender: "Male",
    location: "Okotoks, AB",
    status: "Subscribed (Monthly)",
    lasActive: "16h ago",
    // lasActive: new Date("6-6-2025"),
  },
  {
    name: "Chris Coupal",
    age: 61,
    gender: "Male",
    location: "Calgary, AB",
    status: "Expired",
    lasActive: "3mo ago",
    // lasActive: new Date("6-6-2025"),
  },
];

export default function SubscribersTable() {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[160px]">Name</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Active</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscribers.map((subscriber, index) => (
            <TableRow
              key={subscriber.name}
              className={cn(
                index % 2 === 0 ? "bg-neutral-50" : "bg-neutral-100"
              )}
            >
              <TableCell>{subscriber.name}</TableCell>
              <TableCell>{subscriber.age}</TableCell>
              <TableCell>{subscriber.gender}</TableCell>
              <TableCell>{subscriber.location}</TableCell>
              <TableCell className="text-primary">
                {subscriber.status}
              </TableCell>
              <TableCell>{subscriber.lasActive}</TableCell>
              <TableCell align="right">
                {/* // TODO: Remove message button from expired subscribers. */}
                <button role="button" type="button">
                  <i className="pi pi-envelope" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
