let loaded = false;

export function initGA(measurementId: string) {
  if (loaded || !measurementId) return;
  (window as any).dataLayer = (window as any).dataLayer || [];
  function gtag(){ (window as any).dataLayer.push(arguments as any); }
  (window as any).gtag = gtag;
  gtag('js', new Date());
  gtag('config', measurementId, { send_page_view: false });

  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(s);
  loaded = true;
}

type GAParams = Record<string, any>;

export function gaEvent(eventName: string, params?: GAParams) {
  const g = (window as any).gtag;
  if (typeof g === 'function') g('event', eventName, params || {});
}

export function pageView(path: string, title?: string) {
  gaEvent('page_view', { page_path: path, page_title: title });
}

export function setUserId(userId?: string) {
  if (!userId) return;
  const g = (window as any).gtag;
  if (typeof g === 'function') g('set', { user_id: userId });
}

export function setUserProps(props: GAParams) {
  const g = (window as any).gtag;
  if (typeof g === 'function') g('set', 'user_properties', props);
}
