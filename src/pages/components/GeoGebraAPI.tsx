import React, { useEffect, useRef } from 'react';

interface GGBAppletParameters {
  prerelease: boolean;
  width: number;
  height: number;
  showToolBar: boolean;
  borderColor: null | string;
  showMenuBar: boolean;
  showAlgebraInput: boolean;
  showResetIcon: boolean;
  enableLabelDrags: boolean;
  enableShiftDragZoom: boolean;
  enableRightClick: boolean;
  capturingThreshold: null | number;
  showToolBarHelp: boolean;
  errorDialogsActive: boolean;
  useBrowserForJS: boolean;
}

interface GeoGebraAPIProps {
  functionsToGraph: string[];
}

declare global {
  interface Window {
    GGBApplet: any;
    ggbApplet: any;
  }
}

const GeoGebraAPI: React.FC<GeoGebraAPIProps> = ({ functionsToGraph }) => {
  const appletContainerRef = useRef<HTMLDivElement>(null);

  const parameters: GGBAppletParameters = {
    prerelease: false,
    width: 570,
    height: 400,
    showToolBar: false,
    borderColor: null,
    showMenuBar: false,
    showAlgebraInput: false,
    showResetIcon: false,
    enableLabelDrags: false,
    enableShiftDragZoom: true,
    enableRightClick: false,
    capturingThreshold: null,
    showToolBarHelp: false,
    errorDialogsActive: true,
    useBrowserForJS: false,

  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.geogebra.org/apps/deployggb.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const applet = new window.GGBApplet(parameters, true);
      if (appletContainerRef.current) {
        applet.inject(appletContainerRef.current);
      }

      const checkAppletLoaded = setInterval(() => {
        if (window.ggbApplet) {
          functionsToGraph.forEach((func) => {
            window.ggbApplet.evalCommand(func);
          });

          clearInterval(checkAppletLoaded);
        }
      }, 1000);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [functionsToGraph]);

  return (
    <div className='contentBox'>
      <div id='applet_container' ref={appletContainerRef}></div>
      <div style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
        Powered by{' '}
        <a
          href='https://www.geogebra.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          GeoGebra
        </a>
      </div>
    </div>
  );
};

export default GeoGebraAPI;
