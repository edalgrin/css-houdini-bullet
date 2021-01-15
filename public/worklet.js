if (typeof registerPaint !== "undefined") {
  class Bullet {
    static get inputProperties() {
      return [
        "--bullet-bg",
        "--bullet-border",
        "--bullet-items",
        "--bullet-type",
        "--bullet-curve",
        "--bullet-size",
      ];
    }

    paint(ctx, size, properties) {
      const w = size.width;
      const h = size.height;
      const points = Number(properties.get("--bullet-type")) || 0;
      let color = String(properties.get("--bullet-bg"));
      const curve = Number(properties.get("--bullet-curve")) || 0.5;
      const radius = String(properties.get("--bullet-size"));
      const border = Number(properties.get("--bullet-border")) || 0;
      const n = Number(properties.get("--bullet-items")) || 10;
      const steps = Math.PI / points; //used for stars
      let radiusMin = 0;
      let radiusMax = 10;

      // Check radius
      if (radius) {
        const radiuses = radius.trim().split(",");
        radiusMin = parseFloat(radiuses[0]);
        if (radiuses.length > 1) {
          radiusMax = parseFloat(radiuses[1]);
        } else {
          radiusMax = undefined;
        }
      }

      // Check color
      if (color) {
        const colors = color.trim().split(",");
        const colorsNumber = colors.length;
        if (colorsNumber > 1) {
          let gradient = ctx.createLinearGradient(0, 0, w, h);
          colors.forEach((c, i) => {
            gradient.addColorStop(i * (1 / (colorsNumber - 1)), c);
          });
          color = gradient;
        } else {
          color = colors[0];
        }
      } else if (points === 0) {
        color = "#f5af19";
      } else if (points === 1) {
        color = "#c31432";
      } else {
        color = "#1a2a6c";
      }

      // Create items
      let items = [];
      for (let i = 0; i < n; i++) {
        let x;
        let y;
        let r;

        // Define size/radius of the items
        if (radiusMax) {
          r = Math.random() * (radiusMax - radiusMin) + radiusMin;
        } else {
          r = radiusMin;
        }

        // Try 10000 times to leave a minium gap
        let safety = 10000;
        let repeat = true;
        while (repeat && safety > 0) {
          safety--;
          x = Math.random() * w;
          y = Math.random() * h;
          if (border < w) {
            let safetyX = 100;
            while (safetyX > 0 && (x <= border || x >= w - border)) {
              safetyX--;
              x = Math.random() * w;
            }
          }
          if (border < h) {
            let safetyY = 100;
            while (safetyY > 0 && (y <= border || y >= h - border)) {
              safetyY--;
              y = Math.random() * h;
            }
          }
          repeat = false;
          items.forEach((item) => {
            if (Math.abs(x - item.x) < r * 2 && Math.abs(y - item.y) < r * 2) {
              repeat = true;
            }
          });
        }

        items.push({
          x: x,
          y: y,
          r: r,
        });
      }

      ctx.fillStyle = color;
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "destination-out";
      items.forEach((item) => {
        if (points === 1) {
          // Draw hearts
          // Credit to https://stackoverflow.com/questions/58333678/draw-heart-using-javascript-in-any-postionx-y
          const hx1 = item.x - item.r / 2;
          const hx2 = item.x + item.r / 2;
          const hy1 = item.y + item.r * 0.3;
          const hy2 = item.y + (item.r + item.r * 0.3) / 2;
          ctx.beginPath();
          ctx.moveTo(item.x, hy1);
          ctx.bezierCurveTo(item.x, item.y, hx1, item.y, hx1, hy1);
          ctx.bezierCurveTo(hx1, hy2, item.x, hy2, item.x, item.y + item.r);
          ctx.bezierCurveTo(item.x, hy2, hx2, hy2, hx2, hy1);
          ctx.bezierCurveTo(hx2, item.y, item.x, item.y, item.x, hy1);
          ctx.closePath();
          ctx.fill();
        } else if (points > 1) {
          // Draw stars
          // Credit to https://jsfiddle.net/baivong/ujnckxoa/
          let rot = (Math.PI / 2) * 3;
          ctx.beginPath();
          ctx.moveTo(item.x, item.y - item.r);
          for (let i = 0; i < points; i++) {
            ctx.lineTo(
              item.x + Math.cos(rot) * item.r,
              item.y + Math.sin(rot) * item.r
            );
            rot += steps;

            ctx.lineTo(
              item.x + Math.cos(rot) * (item.r * curve),
              item.y + Math.sin(rot) * (item.r * curve)
            );
            rot += steps;
          }
          ctx.lineTo(item.x, item.y - item.r);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(item.x, item.y, item.r / 2, 0, 2 * Math.PI);
          ctx.fill();
        }
      });
    }
  }

  registerPaint("bullet", Bullet);
}
