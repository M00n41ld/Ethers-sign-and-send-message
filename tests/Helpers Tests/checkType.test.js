import { render } from '@testing-library/react';
import checkType from '../../components/helpers/checkType.js';

describe('checkType', () => {

  it('renders image correctly', () => {
    const prize = 'image.jpg';
    const { container } = render(checkType(prize));
    const imgElement = container.querySelector('img');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', prize);
    expect(imgElement).toMatchSnapshot();
  });

  it('renders default image for empty prize value', () => {
    const prize = '';
    const { container } = render(checkType(prize));
    const imgElement = container.querySelector('span');
    expect(imgElement).toBeInTheDocument();
  });
  
  it('renders default image for invalid image file extension', () => {
    const prize = 'image.xyz';
    const { container } = render(checkType(prize));
    const imgElement = container.querySelector('iframe');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', prize);
  });

  it('renders audio correctly', () => {
    const prize = 'audio.mp3';
    const { container } = render(checkType(prize));
    const audioElement = container.querySelector('audio');
    expect(audioElement).toBeInTheDocument();
    expect(audioElement).toHaveAttribute('src', prize);
  });

  it('renders default audio for empty prize value', () => {
    const prize = '';
    const { container } = render(checkType(prize));
    const audioElement = container.querySelector('span');
    expect(audioElement).toBeInTheDocument();
  });
  
  it('renders video correctly', () => {
    const prize = 'video.mp4';
    const { container } = render(checkType(prize));
    const sourceElement = container.querySelector('source');
    expect(sourceElement).toBeInTheDocument();
    expect(sourceElement).toHaveAttribute('src', prize);
  });

  it('renders default video for empty prize value', () => {
    const prize = '';
    const { container } = render(checkType(prize));
    const videoElement = container.querySelector('span');
    expect(videoElement).toBeInTheDocument();
  });

  it('renders gif correctly', () => {
    const prize = 'image.gif';
    const { container } = render(checkType(prize));
    const imgElement = container.querySelector('img');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', prize);
  });

  it('renders default GIF for empty prize value', () => {
    const prize = '';
    const { container } = render(checkType(prize));
    const gifElement = container.querySelector('span');
    expect(gifElement).toBeInTheDocument();
  });

  it('renders iframe correctly', () => {
    const prize = 'https://example.com';
    const { container } = render(checkType(prize));
    const iframeElement = container.querySelector('iframe');
    expect(iframeElement).toBeInTheDocument();
    expect(iframeElement).toHaveAttribute('src', prize);
  });

  it('renders iframe with default src for empty prize value', () => {
    const prize = '';
    const { container } = render(checkType(prize));
    const iframeElement = container.querySelector('span');
    expect(iframeElement).toBeInTheDocument();
  });

  it('renders iframe with custom width and height for non-image/audio/video/gif URLs', () => {
    const prize = 'https://example.com/document.pdf';
    const { container } = render(checkType(prize));
    const iframeElement = container.querySelector('iframe');
    expect(iframeElement).toBeInTheDocument();
    expect(iframeElement).toHaveAttribute('width', '300');
    expect(iframeElement).toHaveAttribute('height', '200');
  });
});
