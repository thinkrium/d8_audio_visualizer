<?php

   namespace Drupal\audio_visualizer\Plugin\Block;
   use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'Hello' Block.
 *
 * @Block(
 *   id = "audio_visualizer",
 *   admin_label = @Translation("Audio Visualizer"),
 *   category = @Translation("Media"),
 * )
 */

   class audio_visualized_block extends BlockBase {
       public function build() {
          return "hello block"; 
       }
   }