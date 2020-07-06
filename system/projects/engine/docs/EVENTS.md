# Events
___


### DOMContentLoaded

### scene-ready 
- CS1.scene has referenced an **a-scene**

### player-ready 
- CS1.myPlayer has referenced an **a-player**

### device-declared 
- CS1.device is now defined

### cs1-ready 
- fired after **aframe-hydrated**
- CS1 APIs should be available
 
### cs1-script-fired
- dispatched after each **cs1-script** has been evaluated
- src loaded scripts are guaranteed to run before inlined scripts

### game-start
- dispatched after a **cs1-script** has called **CS1.game.start()**

### my-avatar-ready
- CS1.myPlayer.avatar has been defined.

### view-ready
- final device related view and controls have been set
- the CS1.myPlayer.setAvatar() enables settings to be configured via cs1-scripts