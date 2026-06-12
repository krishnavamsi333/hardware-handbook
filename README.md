# Hardware Handbook

A comprehensive reference for hardware engineers — covering fundamentals, circuit analysis, PCB design, signal integrity, EMI/EMC, robotics, and more.

---

## Project Structure

```
hardware-handbook/
│
├── index.html
├── learning-path.html
├── design-checklists.html
├── interview-questions.html
├── glossary.html
├── references.html
├── about.html
├── README.md
│
├── css/
│   ├── style.css
│   └── dark-theme.css
│
├── js/
│   ├── main.js
│   └── search.js
│
├── images/
│   ├── fundamentals/
│   ├── capacitors/
│   ├── power/
│   ├── mosfets/
│   ├── communication/
│   ├── pcb/
│   ├── signal-integrity/
│   ├── emi-emc/
│   └── robotics/
│
├── assets/
│   ├── pdf/
│   ├── datasheets/
│   └── simulations/
│
└── chapters/
    │
    ├── fundamentals/
    │   ├── voltage-current-power.html
    │   ├── conventional-current.html
    │   ├── ohms-law.html
    │   ├── grounding.html
    │   ├── return-current-paths.html
    │   ├── pullups-pulldowns.html
    │   ├── floating-inputs.html
    │   ├── open-drain.html
    │   ├── push-pull.html
    │   └── digital-logic.html
    │
    ├── circuit-analysis/
    │   ├── kirchhoffs-laws.html
    │   ├── voltage-divider.html
    │   ├── current-divider.html
    │   ├── rc-circuits.html
    │   ├── rl-circuits.html
    │   ├── lc-circuits.html
    │   ├── resonance.html
    │   └── filter-basics.html
    │
    ├── capacitors/
    │   ├── capacitor-basics.html
    │   ├── capacitor-types.html
    │   ├── bypass-capacitors.html
    │   ├── decoupling-capacitors.html
    │   ├── bulk-capacitors.html
    │   ├── input-capacitors.html
    │   ├── output-capacitors.html
    │   ├── filter-capacitors.html
    │   ├── ac-coupling-capacitors.html
    │   ├── bootstrap-capacitors.html
    │   ├── snubber-capacitors.html
    │   └── timing-capacitors.html
    │
    ├── magnetics/
    │   ├── inductor-basics.html
    │   ├── transformers.html
    │   ├── ferrites.html
    │   ├── common-mode-chokes.html
    │   └── flyback-transformers.html
    │
    ├── power/
    │   ├── power-distribution.html
    │   ├── current-return-path.html
    │   ├── voltage-drop.html
    │   ├── trace-current-capacity.html
    │   ├── ldo.html
    │   ├── buck-converter.html
    │   ├── boost-converter.html
    │   ├── buck-boost-converter.html
    │   ├── power-sequencing.html
    │   ├── reverse-polarity-protection.html
    │   ├── fuse-selection.html
    │   ├── tvs-diodes.html
    │   ├── overcurrent-protection.html
    │   └── inrush-current-protection.html
    │
    ├── mosfets/
    │   ├── mosfet-basics.html
    │   ├── n-channel-mosfet.html
    │   ├── p-channel-mosfet.html
    │   ├── body-diode.html
    │   ├── gate-charge.html
    │   ├── gate-resistors.html
    │   ├── gate-pulldown-resistors.html
    │   ├── low-side-switching.html
    │   ├── high-side-switching.html
    │   ├── flyback-diodes.html
    │   └── mosfet-soa.html
    │
    ├── sensors/
    │   ├── adc-basics.html
    │   ├── dac-basics.html
    │   ├── opamps.html
    │   ├── sensor-conditioning.html
    │   ├── shunt-resistors.html
    │   ├── current-sensing.html
    │   ├── thermistors.html
    │   ├── hall-effect-sensors.html
    │   ├── encoder-basics.html
    │   └── imu-interfaces.html
    │
    ├── communication/
    │   ├── uart.html
    │   ├── uart-esd-protection.html
    │   ├── i2c-basics.html
    │   ├── i2c-pullups.html
    │   ├── i2c-layout-guidelines.html
    │   ├── spi-basics.html
    │   ├── spi-chip-select.html
    │   ├── spi-series-resistors.html
    │   ├── can-basics.html
    │   ├── can-termination.html
    │   ├── can-split-termination.html
    │   ├── can-common-mode-choke.html
    │   ├── can-esd-protection.html
    │   ├── rs485-basics.html
    │   ├── rs485-termination.html
    │   └── rs485-biasing.html
    │
    ├── pcb/
    │   ├── pcb-overview.html
    │   ├── trace-width.html
    │   ├── via-current-capacity.html
    │   ├── via-stitching.html
    │   ├── copper-pours.html
    │   ├── ground-pours.html
    │   ├── thermal-relief.html
    │   ├── power-routing.html
    │   ├── signal-routing.html
    │   ├── decoupling-placement.html
    │   ├── stackup-2layer.html
    │   ├── stackup-4layer.html
    │   └── stackup-6layer.html
    │
    ├── signal-integrity/
    │   ├── rise-time.html
    │   ├── fall-time.html
    │   ├── ringing.html
    │   ├── overshoot.html
    │   ├── undershoot.html
    │   ├── reflections.html
    │   ├── series-termination.html
    │   ├── controlled-impedance.html
    │   ├── impedance-matching.html
    │   ├── differential-signals.html
    │   ├── differential-pair-routing.html
    │   └── length-matching.html
    │
    ├── emi-emc/
    │   ├── emi-basics.html
    │   ├── radiated-emi.html
    │   ├── conducted-emi.html
    │   ├── return-paths.html
    │   ├── loop-area-reduction.html
    │   ├── common-mode-noise.html
    │   ├── differential-mode-noise.html
    │   ├── ferrite-beads.html
    │   └── common-mode-chokes.html
    │
    ├── connectors/
    │   ├── connector-selection.html
    │   ├── power-connectors.html
    │   ├── signal-connectors.html
    │   ├── can-cabling.html
    │   ├── cable-shielding.html
    │   ├── hot-plugging.html
    │   └── esd-at-connectors.html
    │
    ├── mcu-design/
    │   ├── reset-circuit.html
    │   ├── boot-circuit.html
    │   ├── crystal-oscillator.html
    │   ├── programming-header.html
    │   ├── debug-header.html
    │   ├── watchdog-considerations.html
    │   └── level-shifters.html
    │
    ├── embedded-computers/
    │   ├── raspberry-pi-hardware.html
    │   ├── jetson-hardware.html
    │   ├── powering-sbc.html
    │   ├── usb-considerations.html
    │   └── ethernet-considerations.html
    │
    ├── batteries/
    │   ├── li-ion-basics.html
    │   ├── lifepo4-basics.html
    │   ├── battery-sizing.html
    │   ├── battery-protection.html
    │   ├── charging-circuits.html
    │   └── bms-basics.html
    │
    ├── manufacturing/
    │   ├── drc-rules.html
    │   ├── trace-clearance.html
    │   ├── annular-ring.html
    │   ├── via-sizes.html
    │   ├── solder-mask.html
    │   ├── silkscreen.html
    │   └── panelization.html
    │
    ├── dfa/
    │   ├── component-orientation.html
    │   ├── fiducials.html
    │   └── assembly-constraints.html
    │
    ├── dft/
    │   ├── test-points.html
    │   ├── test-pads.html
    │   ├── programming-connectors.html
    │   └── debug-connectors.html
    │
    ├── debugging/
    │   ├── multimeter.html
    │   ├── oscilloscope.html
    │   ├── logic-analyzer.html
    │   ├── can-analyzer.html
    │   ├── troubleshooting-methodology.html
    │   └── common-hardware-failures.html
    │
    ├── reliability/
    │   ├── derating.html
    │   ├── temperature-effects.html
    │   ├── power-dissipation.html
    │   ├── thermal-design.html
    │   ├── heat-sinks.html
    │   └── thermal-vias.html
    │
    ├── safety/
    │   ├── fuse-coordination.html
    │   ├── electrical-isolation.html
    │   ├── creepage-clearance.html
    │   ├── emergency-stop-principles.html
    │   └── functional-safety.html
    │
    ├── robotics/
    │   ├── robot-power-architecture.html
    │   ├── can-bus-design.html
    │   ├── motor-driver-protection.html
    │   ├── solenoid-driver-protection.html
    │   ├── reverse-battery-protection.html
    │   ├── load-dump-protection.html
    │   ├── sensor-interface-design.html
    │   ├── encoder-interface-design.html
    │   └── emergency-stop-circuit-design.html
    │
    └── projects/
        ├── esp32-minimum-board.html
        ├── can-node.html
        ├── imu-interface-board.html
        ├── motor-driver-board.html
        ├── solenoid-controller-board.html
        ├── battery-monitor-board.html
        └── robot-control-board.html
```

---

## Chapters Overview

| Chapter | Topics |
|---|---|
| **Fundamentals** | Voltage, current, power, Ohm's law, grounding, pull-ups/downs, logic levels |
| **Circuit Analysis** | KVL/KCL, voltage/current dividers, RC/RL/LC circuits, filters |
| **Capacitors** | Types, bypass, decoupling, bulk, snubber, AC coupling, bootstrap |
| **Magnetics** | Inductors, transformers, ferrites, common-mode chokes |
| **Power** | LDO, buck/boost converters, sequencing, protection circuits |
| **MOSFETs** | N/P channel, gate drive, high/low side switching, SOA |
| **Sensors** | ADC/DAC, op-amps, current sensing, thermistors, Hall effect, encoders |
| **Communication** | UART, I2C, SPI, CAN bus, RS-485 — wiring, termination, protection |
| **PCB Design** | Trace width, vias, copper pours, stackups, routing guidelines |
| **Signal Integrity** | Rise/fall time, ringing, reflections, impedance, differential pairs |
| **EMI / EMC** | Radiated/conducted EMI, loop area, common/differential mode noise |
| **Connectors** | Selection, power/signal, CAN cabling, shielding, ESD, hot-plugging |
| **MCU Design** | Reset, boot, oscillator, programming/debug headers, watchdog |
| **Embedded Computers** | Raspberry Pi, Jetson, SBC powering, USB, Ethernet |
| **Batteries** | Li-ion, LiFePO4, sizing, protection, charging, BMS |
| **Manufacturing** | DRC, trace clearance, annular ring, solder mask, silkscreen, panelization |
| **DFA** | Component orientation, fiducials, assembly constraints |
| **DFT** | Test points/pads, programming/debug connectors |
| **Debugging** | Multimeter, oscilloscope, logic analyzer, CAN analyzer, troubleshooting |
| **Reliability** | Derating, thermal design, heat sinks, thermal vias |
| **Safety** | Fuse coordination, isolation, creepage/clearance, e-stop, functional safety |
| **Robotics** | Power architecture, CAN bus, motor/solenoid drivers, protection, sensors |
| **Projects** | ESP32 board, CAN node, IMU board, motor driver, solenoid controller, robot control |

---

## Status

> **Currently in progress.** Building chapters one section at a time, starting with `fundamentals/`.

### Completed
- [ ] fundamentals/
- [ ] circuit-analysis/
- [ ] capacitors/
- [ ] magnetics/
- [ ] power/
- [ ] mosfets/
- [ ] sensors/
- [ ] communication/
- [ ] pcb/
- [ ] signal-integrity/
- [ ] emi-emc/
- [ ] connectors/
- [ ] mcu-design/
- [ ] embedded-computers/
- [ ] batteries/
- [ ] manufacturing/
- [ ] dfa/
- [ ] dft/
- [ ] debugging/
- [ ] reliability/
- [ ] safety/
- [ ] robotics/
- [ ] projects/

---

## Contributing

This is a personal engineering reference. If you spot an error or have a suggestion, feel free to open an issue.

---

## License

MIT
