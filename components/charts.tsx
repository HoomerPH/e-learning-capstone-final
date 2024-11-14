"use client";

import { Bar, Line, Pie } from "recharts";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart as RechartsBarChart,
  LineChart as RechartsLineChart,
  PieChart as RechartsPieChart,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

interface PieChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
}

export function PieChart({ data }: PieChartProps) {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
}

interface LineChartProps {
  data: Array<{
    date: string;
    students: number;
  }>;
}

export function LineChart({ data }: LineChartProps) {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="students"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}

interface BarChartProps {
  data: Array<any>;
  type?: "single" | "grouped";
}

export function BarChart({ data, type = "single" }: BarChartProps) {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="course" />
          <YAxis />
          <Tooltip />
          <Legend />
          {type === "single" ? (
            <Bar dataKey="visits" fill="#8884d8" />
          ) : (
            <>
              <Bar dataKey="pre" fill="#8884d8" name="Pre-Assessment" />
              <Bar dataKey="post" fill="#82ca9d" name="Post-Assessment" />
            </>
          )}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}