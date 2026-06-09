import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, parseISO, differenceInYears } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string, fmt = 'dd MMM yyyy'): string {
  try {
    return format(parseISO(date), fmt);
  } catch {
    return date;
  }
}

export function formatTime(time: string): string {
  try {
    const [h, m] = time.split(':');
    const hour = parseInt(h);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${m} ${ampm}`;
  } catch {
    return time;
  }
}

export function calcAge(dob: string): number {
  try {
    return differenceInYears(new Date(), parseISO(dob));
  } catch {
    return 0;
  }
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function statusColor(status: string): string {
  const map: Record<string, string> = {
    ACTIVE: 'bg-green-100 text-green-700',
    CONFIRMED: 'bg-green-100 text-green-700',
    COMPLETED: 'bg-gray-100 text-gray-600',
    IN_PROGRESS: 'bg-blue-100 text-blue-700',
    PENDING: 'bg-amber-100 text-amber-700',
    DRAFT: 'bg-yellow-100 text-yellow-700',
    CANCELLED: 'bg-red-100 text-red-600',
    SCHEDULED: 'bg-purple-100 text-purple-700',
  };
  return map[status] ?? 'bg-gray-100 text-gray-600';
}
