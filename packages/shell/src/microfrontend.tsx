import React, { useEffect, memo } from 'react';
import slugify from 'slugify';

const loadAsset = (id : string, src : string, hostUrl : string) => {
	if(/\.js$/.test(src)) {
		const script = document.createElement('script');
		script.setAttribute('id',  id);
		script.setAttribute('src', `${hostUrl}/${src}`);
		script.setAttribute('type', 'text/javascript');

		document.body.appendChild(script);
	}
	else if(/\.css$/.test(src)) {
		const link = document.createElement('link');
		link.setAttribute('id', id);
		link.setAttribute('rel', 'stylesheet');
		link.setAttribute('type', 'text/css');
		link.setAttribute('href', `${hostUrl}/${src}`);

		document.head.appendChild(link);
	}
};

interface Props {
	url: string;
	id: string;
}

const MicroFrontend : React.FC<Props> = ({ url, id }) => {
	useEffect(() => {
		(async () => {
			const assets = await fetch(`${url}/asset-manifest.json`);
			const assetManifest = await assets.json();

			if(typeof assetManifest.entrypoints !== 'undefined') {
				assetManifest.entrypoints.forEach((entrypoint : string) => {
					const id = slugify(`${url} ${entrypoint}`, {
						replacement: '-',
						strict: true,
					});
					loadAsset(id, entrypoint, url);
				});
			}
		})();
	}, [url]);

	return <div id={id} />;
};

export default memo((props : Props) => {
	return <MicroFrontend {...props} />
});
