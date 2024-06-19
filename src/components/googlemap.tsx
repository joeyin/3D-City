'use client';

import React, { useState, useRef, useEffect } from "react";
import { CatmullRomCurve3, Vector3, Group } from "three";
import ThreeJSOverlayView from "@ubilabs/threejs-overlay-view";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Line2 } from "three/examples/jsm/lines/Line2";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial";

const MAP_OPTIONS = {
  mapId: '7057886e21226ff7',
  center: { lat: 43.64916, lng: -79.37789000000001 },
  zoom: 18,
  heading: 40,
  tilt: 65,
  disableDefaultUI: true
}
const ANIMATION_DURATION = 28000;
const ANIMATION_POINTS = [
  { lat: 43.64916, lng: -79.37789000000001 },
  { lat: 43.647850000000005, lng: -79.37735 },
  { lat: 43.64705, lng: -79.37702 },
  { lat: 43.646930000000005, lng: -79.37698 },
  { lat: 43.646950000000004, lng: -79.37683000000001 },
  { lat: 43.64705, lng: -79.37661 },
  { lat: 43.64716000000001, lng: -79.3764 },
  { lat: 43.647470000000006, lng: -79.37576 },
  { lat: 43.64732, lng: -79.37570000000001 },
  { lat: 43.647090000000006, lng: -79.3756 },
  { lat: 43.646890000000006, lng: -79.3755 },
  { lat: 43.646980000000006, lng: -79.37530000000001 },
  { lat: 43.64715, lng: -79.37494000000001 },
];
const CAR_FRONT = new Vector3(0, 1, 0);
const GLB_MODEL_FILE = "/taxi.gltf";
const GLB_TREE_FILE = "/tree.glb";
const GLB_BOY_FILE = "/boy.glb";

export default function GoogleMap() {
  const [map, setMap] = useState<google.maps.Map>();
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current && setMap(new window.google.maps.Map(ref.current, MAP_OPTIONS));
  }, []);

  return (
    <>
      <div ref={ref} id="map" />
      {map && <GlbModel map={map} />}
    </>
  )
}

function GlbModel({ map }: { map: google.maps.Map }) {
  const overlayRef = useRef<ThreeJSOverlayView>();

  const carRef = useRef<Group>();
  const treeRef = useRef<Group>();
  const boyRef = useRef<Group>();

  const trackRef = useRef<Line2>();
  const tmpVec3 = new Vector3();
  const route: google.maps.LatLngLiteral[] = ANIMATION_POINTS;

  useEffect(() => {
    // in case render twice
    if (overlayRef.current) {
      return;
    }

    overlayRef.current = new ThreeJSOverlayView(MAP_OPTIONS.center);
    overlayRef.current.setMap(map);

    const scene = overlayRef.current.scene;
    const points = route.map(p => overlayRef.current.latLngAltToVector3(p));

    const curve = new CatmullRomCurve3(points, true, 'catmullrom', 0.2);
    curve.updateArcLengths();

    if (!trackRef.current) {
      trackRef.current = createTrackFromCurve(curve);
      scene.add(trackRef.current);
    }

    if (!carRef.current) {
      loadCarModel().then(model => {
        carRef.current = model;
        scene.add(carRef.current);
        overlayRef.current.requestRedraw();
      })
    };

    if (!treeRef.current) {
      loadTreeModel().then(model => {
        treeRef.current = model;
        scene.add(treeRef.current);
        overlayRef.current.requestRedraw();
      })
    };

    if (!boyRef.current) {
      loadBoyModel().then(model => {
        boyRef.current = model;
        scene.add(boyRef.current);
        overlayRef.current.requestRedraw();
      })
    };

    overlayRef.current.update = () => {
      trackRef?.current?.material.resolution.copy(overlayRef.current.getViewportSize());

      if (carRef.current) {
        const animationProgress = (performance.now() % ANIMATION_DURATION) / ANIMATION_DURATION;
        curve.getPointAt(animationProgress, carRef.current.position);
        curve.getTangentAt(animationProgress, tmpVec3);
        carRef.current.quaternion.setFromUnitVectors(CAR_FRONT, tmpVec3);
        overlayRef.current.requestRedraw();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null;
}

function createTrackFromCurve(curve: any) {
  const numPoints = 10 * curve.points.length;
  const curvePoints = curve.getSpacedPoints(numPoints);
  const positions = new Float32Array(numPoints * 3);

  for (let i = 0; i < numPoints; i++) {
    curvePoints[i].toArray(positions, 3 * i);
  }

  const trackLine = new Line2(
    new LineGeometry(),
    new LineMaterial({
      color: 0xCC9900,
      linewidth: 8
    })
  );

  trackLine.geometry.setPositions(positions);
  return trackLine;
}

async function loadTreeModel() {
  // load taxi
  const gltf = await new GLTFLoader().loadAsync(GLB_TREE_FILE);
  const group = gltf.scene;

  if (group) {
    group.scale.setScalar(3);
    group.rotation.set(Math.PI / 2, 0, Math.PI, 'ZXY');
    group.position.setY(10);
  }

  return group;
}

async function loadBoyModel() {
  // load taxi
  const gltf = await new GLTFLoader().loadAsync(GLB_BOY_FILE);
  const group = gltf.scene;

  if (group) {
    group.scale.setScalar(8);
    group.rotation.set(Math.PI / 2, 0, Math.PI, 'ZXY');
    group.position.setX(10);
  }

  return group;
}

async function loadCarModel() {
  // load taxi
  const gltf = await new GLTFLoader().loadAsync(GLB_MODEL_FILE);
  const group = gltf.scene;
  const carModel: THREE.Object3D | undefined = group.getObjectByName('Car_Rig'); // the object name

  if (carModel) {
    carModel.scale.setScalar(3);
    carModel.rotation.set(Math.PI / 2, 0, Math.PI, 'ZXY');
  }

  return group;
}
