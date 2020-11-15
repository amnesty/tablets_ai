<?php

/**
 * @file
 * Default theme implementation to display a single Drupal page.
 * Regions:
 * - $page['help']: Dynamic help text, mostly for admin pages.
 * - $page['highlighted']: Items for the highlighted content region.
 * - $page['content']: The main content of the current page.
 * - $page['sidebar_first']: Items for the first sidebar.
 * - $page['sidebar_second']: Items for the second sidebar.
 * - $page['header']: Items for the header region.
 * - $page['footer']: Items for the footer region.
 *
 * @see bootstrap_preprocess_page()
 * @see template_preprocess()
 * @see template_preprocess_page()
 * @see bootstrap_process_page()
 * @see template_process()
 * @see html.tpl.php
 *
 * @ingroup templates
 */
?>
<nav class="navbar navbar-fixed-top">
  <header class="header" data-header="" role="banner">
    <div class="header__container" data-header-container="">
        <div class="header__slogan-container"></div>
        <h1 class="logo logo_mobile" data-logo=""><a class="logo__link logo__link_mobile">Amnistia Internacional</a></h1>
  </header>
</nav>

<div class="main-container <?php print $container_class; ?>">

  <header role="banner" id="page-header">
    <?php if (!empty($site_slogan)): ?>
      <p class="lead"><?php print $site_slogan; ?></p>
    <?php endif; ?>

    <?php render($page['header']); ?>
  </header> <!-- /#page-header -->

  <div class="row">

    <?php if (!empty($page['sidebar_first'])): ?>
      <aside class="col-sm-3" role="complementary">
        <?php print render($page['sidebar_first']); ?>
      </aside>  <!-- /#sidebar-first -->
    <?php endif; ?>

    <section<?php print $content_column_class; ?>>
      <?php if (!empty($page['highlighted'])): ?>
        <div class="highlighted jumbotron"><?php print render($page['highlighted']); ?></div>
      <?php endif; ?>
      <?php if (!empty($breadcrumb)): print $breadcrumb;
      endif;?>
      <a id="main-content"></a>
      <?php print render($title_prefix); ?>
      <?php if (!empty($title)): ?>
        <h1 class="page-header"><?php $title = explode('#',$title); echo $title[0]; ?></h1>
      <?php endif; ?>
      <?php print render($title_suffix); ?>
      <?php print $messages; ?>
      <?php if ( !in_array('dd', $user->roles) && !empty($tabs) ): ?>
        <?php print render($tabs); ?>
      <?php endif; ?>
      <?php if (!empty($page['help'])): ?>
        <?php print render($page['help']); ?>
      <?php endif; ?>
      <?php if( !empty($action_links) ): ?>
        <ul class="action-links"><?php print render($action_links); ?></ul>
      <?php endif; ?>
      <?php print render($page['content']); ?>
    </section>

    <?php if (!empty($page['sidebar_second'])): ?>
      <aside class="col-sm-3" role="complementary">
        <?php print render($page['sidebar_second']); ?>
      </aside>  <!-- /#sidebar-second -->
    <?php endif; ?>

  </div>
</div>

<?php if (!empty($page['footer'])): ?>
  <footer class="footer <?php print $container_class; ?>">
    <?php //print render($page['footer']); ?>
    <table><tr>
      <td><img height="60" src="<?php print(base_path().drupal_get_path('theme', 'tablets_ai')); ?>/images/icon-hand.png" /></td>
      <td><p>Todas tus aportaciones desgravan un 80% los primeros 150€, y a partir de esa cifra, el 35%.
        No se aplica ni a País Vasco ni a Navarra.</p></tr>
    </tr></table>
  </footer>
  <?php if( user_is_logged_in() && in_array('dd', array_values($user->roles)) ){ ?>
    <div id="menu-dd" text-align="center">
      <?php
      $path = request_uri();
      $dest_path = str_replace("/civicrm/", "", $path);
      ?>
        <a href="<?php print base_path();?>user/logout/?destination=<?php print $dest_path;?>">Cerrar sesión</a>
        <span>  |  </span>
        <a href="<?php print base_path();?>node/<?php echo $node->nid; ?>/webform-results">Ver registros gurardados</a>
    </div>
  <?php } ?>
<?php endif; ?>
