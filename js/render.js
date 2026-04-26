/**
 * Renders project content from window.SITE_PROJECTS:
 *   - On the homepage: the alternating project rows (mount: #project-list).
 *   - On case studies: the "next projects" carousel (mount: [data-next-projects]).
 *
 * Path resolution: SITE_PROJECTS uses paths anchored at the site root.
 * Each mount point declares its depth via `data-root="."` (homepage) or
 * `data-root="../.."` (case study at depth 2). All href/src values are
 * prefixed with that root.
 */
(function () {
  'use strict';

  /** Resolve a root-relative path against the mount's `data-root` value. */
  function resolve(root, path) {
    if (!path) return path;
    return root === '.' || root === '' ? path : root + '/' + path;
  }

  function projectRowHtml(project, index, root) {
    var imageRight = index % 2 === 0;
    var heroSrc = resolve(root, project.hero);
    var arrowSrc = resolve(root, 'img/right-arrow.svg');
    var caseStudyHref = resolve(root, 'case-studies/' + project.slug + '/index.html');

    var imageCol =
      '<div class="col-lg-8 px-0' + (imageRight ? '' : ' order-lg-12') + '"' +
      (imageRight ? '' : ' style="float: left;"') + '>' +
      '<img class="img-fluid project-img" src="' + heroSrc + '"' +
      (imageRight ? ' style="float: right;"' : '') + ' loading="lazy" alt="' + project.title + ' hero">' +
      '</div>';

    var copyCol =
      '<div class="col-lg-4' + (imageRight ? '' : ' order-lg-1') +
      '" style="text-align: center; position: relative; align-self: center;">' +
        '<div class="row" style="padding-left: 15px;">' +
          '<h2 class="mb-5 tm-content-title project-title" style="text-align: left;">' +
            project.title +
          '</h2>' +
        '</div>' +
        '<div class="row' + (imageRight ? ' px-3' : '') + '" style="padding-left: 15px;">' +
          '<div class="col-2 yellow-box-bootstrap"></div>' +
          '<div class="col-10" style="text-align: left;">' +
            project.summary +
            '<hr class="read-more-spacer">' +
            '<a href="' + caseStudyHref + '">' +
              '<button type="button" class="btn rounded read-more">' +
                'Read More <img class="read-more-arrow" src="' + arrowSrc + '" alt="">' +
              '</button>' +
            '</a>' +
          '</div>' +
        '</div>' +
      '</div>';

    return (
      '<hr class="mb-5">' +
      '<div class="row px-0 mx-0">' +
        (imageRight ? imageCol + copyCol : imageCol + copyCol) +
      '</div>'
    );
  }

  function renderProjectList(mount) {
    var root = mount.getAttribute('data-root') || '.';
    var html = window.SITE_PROJECTS.map(function (project, i) {
      return projectRowHtml(project, i, root);
    }).join('');
    mount.insertAdjacentHTML('beforebegin', html);
    mount.parentNode.removeChild(mount);
  }

  function carouselSlideHtml(project, slot, isActive, root) {
    var thumbSrc = resolve(root, project.thumbnail);
    var arrowSrc = resolve(root, 'img/right-arrow.svg');
    var href = resolve(root, 'case-studies/' + project.slug + '/index.html');
    var holderId = 'next-holder-' + slot;

    return (
      '<div class="carousel-item' + (isActive ? ' active' : '') + '">' +
        '<a href="' + href + '">' +
          '<img class="d-block w-100 car-img" src="' + thumbSrc + '" id="' + holderId +
          '" alt="' + project.shortTitle + '" loading="lazy">' +
          '<div class="row carousel-caption carousel-banner" style="z-index: 1;"' +
            ' onmouseover="BlurCarouselImg(\'' + holderId + '\')"' +
            ' onmouseout="ResetCarouselImg(\'' + holderId + '\')">' +
            '<div class="col-3 car-yel" style="display: flex; flex-direction: row-reverse;">' +
              '<div class="row yellow-box mt-3"></div>' +
            '</div>' +
            '<div class="col-md-7 col-9 ml-4 car-cap">' +
              '<div class="row carousel-title"><strong>' + project.shortTitle + '</strong></div>' +
              '<div class="row mobile-invisible" style="text-align: left;">' +
                project.shortSummary +
              '</div>' +
              '<div class="row desktop-invisible car-read-more" style="text-align: left;">' +
                'Read More <img class="read-more-arrow" src="' + arrowSrc + '" alt="">' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</a>' +
      '</div>'
    );
  }

  function nextProjectsCarouselHtml(currentSlug, root) {
    var others = window.SITE_PROJECTS.filter(function (p) {
      return p.slug !== currentSlug;
    });

    var indicators = others.map(function (_, i) {
      return '<li data-target="#next-projects" data-slide-to="' + i + '"' +
        (i === 0 ? ' class="active"' : '') + '></li>';
    }).join('');

    var slides = others.map(function (p, i) {
      return carouselSlideHtml(p, i, i === 0, root);
    }).join('');

    return (
      '<div id="next-projects" class="carousel carousel-h100 slide" data-ride="carousel" data-interval="3000">' +
        '<ol class="carousel-indicators">' + indicators + '</ol>' +
        '<div class="carousel-inner" role="listbox">' + slides + '</div>' +
        '<a class="carousel-control-prev mobile-invisible" href="#next-projects" role="button" data-slide="prev">' +
          '<span class="carousel-control-prev-icon" aria-hidden="true"></span>' +
          '<span class="sr-only">Previous</span>' +
        '</a>' +
        '<a class="carousel-control-next" href="#next-projects" role="button" data-slide="next">' +
          '<span class="carousel-control-next-icon" aria-hidden="true"></span>' +
          '<span class="sr-only">Next</span>' +
        '</a>' +
      '</div>'
    );
  }

  function renderNextProjects(mount) {
    var root = mount.getAttribute('data-root') || '../..';
    var currentSlug = mount.getAttribute('data-current-slug') || '';
    mount.innerHTML = nextProjectsCarouselHtml(currentSlug, root);
  }

  function init() {
    if (!window.SITE_PROJECTS) return;

    var listMount = document.getElementById('project-list');
    if (listMount) renderProjectList(listMount);

    var nextMount = document.querySelector('[data-next-projects]');
    if (nextMount) renderNextProjects(nextMount);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
