"use client";

import React from 'react';

export default function ContactForm() {
	return (
		<div className="max-w-xl">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					// lightweight client-side placeholder — server action handles real submits
					// keep UX friendly: instruct users to call if JS is unavailable
					alert('Thanks — your message was received. Or call 513-787-8798');
				}}
				className="space-y-4"
			>
				<div>
					<label className="block text-sm font-medium">Name</label>
					<input type="text" name="name" className="mt-1 block w-full" />
				</div>
				<div>
					<label className="block text-sm font-medium">Email</label>
					<input type="email" name="email" className="mt-1 block w-full" />
				</div>
				<div>
					<label className="block text-sm font-medium">Message</label>
					<textarea name="message" className="mt-1 block w-full" rows={4} />
				</div>
				<div className="flex items-center gap-3">
					<button type="submit" className="btn btn-primary">Send message</button>
					<a href="tel:+15137878798" className="underline">Or call 513-787-8798</a>
				</div>
			</form>
		</div>
	);
}

