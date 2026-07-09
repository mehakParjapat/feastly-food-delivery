import { NextResponse } from 'next/server';

export function success(data = null, message = 'OK', status = 200) {
  return NextResponse.json({ success: true, message, data }, { status });
}

export function failure(message = 'Error', status = 400, errors = null) {
  return NextResponse.json({ success: false, message, errors }, { status });
}
