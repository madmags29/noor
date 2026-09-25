import os
from PIL import Image

temp_dir = os.path.join(os.path.dirname(__file__), 'temp_og_frames')
public_dir = os.path.join(os.path.dirname(__file__), '../public')

files = sorted([f for f in os.listdir(temp_dir) if f.startswith('frame_') and f.endswith('.png')])
print(f'Found {len(files)} frames to assemble')

images = [Image.open(os.path.join(temp_dir, f)) for f in files]

# 1. Save Animated WebP (Full 1200x630 resolution, 65ms per frame = ~15.4 fps)
webp_path = os.path.join(public_dir, 'og-animated.webp')
images[0].save(
    webp_path,
    save_all=True,
    append_images=images[1:],
    duration=65,
    loop=0,
    quality=90,
    method=4
)
print(f'Saved animated WebP: {webp_path} ({os.path.getsize(webp_path)} bytes)')

# 2. Save Animated GIF (Quantized adaptive palette for optimal web size and fast social load)
gif_frames = []
for im in images:
    # Convert RGBA to RGB with dark background
    bg = Image.new('RGB', im.size, (2, 18, 13))
    bg.paste(im, mask=im.split()[3])
    # Quantize to 128 colors for clean, crisp, small GIF
    p_im = bg.quantize(colors=128, method=Image.Quantize.MEDIANCUT)
    gif_frames.append(p_im)

gif_path = os.path.join(public_dir, 'og-animated.gif')
gif_frames[0].save(
    gif_path,
    save_all=True,
    append_images=gif_frames[1:],
    duration=65,
    loop=0,
    optimize=True
)
print(f'Saved animated GIF: {gif_path} ({os.path.getsize(gif_path)} bytes)')
print('SUCCESS!')
