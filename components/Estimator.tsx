import React from 'react';
import Link from 'next/link';

export default function Estimator() {
	return (
		<div className="p-4 border rounded">
			<h3 className="font-semibold">Estimator</h3>
			<p className="text-sm mt-2">Quick estimate form coming soon.</p>
			<p className="mt-2 text-sm">Questions? <a href="tel:+15137878798" className="underline">513-787-8798</a></p>
			<p className="mt-3"><Link href="/contact" className="underline">Contact us for a custom quote</Link></p>
		</div>
	);
}

