<?php

 namespace Drupal\audio_visualizer\Controller;
 
 use Drupal\Core\Controller\ControllerBase;
 
 class audio_visualizer_config extends ControllerBase {
     
     public function content() {
          return [
            '#type' => 'markup',
            '#markup' => $this->t('Hello, World!'),
          ];
     }
 }