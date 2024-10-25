<script>
export default {
    name: 'PanelsPage',
}
</script>

<template>
    <div class="text-center">
        <p class="text-2xl">Page Panneaux</p>
    </div>
    <div class="overflow-x-auto">
  <table class="table">
    <!-- head -->
    <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" class="checkbox" />
          </label>
        </th>
        <th>Aperçus</th>
        <th>Adresse</th>
        <th>Dimensions</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <!-- row 1 -->
      <tr>
        <th>
          <label>
            <input type="checkbox" class="checkbox" />
          </label>
        </th>
        <td>
          <div class="flex items-center gap-3">
            <div class="avatar">
              <div class="h-20 w-20">
                <img
                  src="/src/assets/images/Panneau1.jpg"
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div class="font-bold">Panneau1.jpg</div>
            </div>
          </div>
        </td>
        <td>
        Ville,Rue,Code postal
          <br />
          <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-500 dark:text-white">Disponible</span>
        </td>
        <td>4x3 mètres</td>
        <th>
          <button class="btn btn-ghost btn-xs">details</button>
        </th>
      </tr>
      <!-- row 2 -->
      <tr>
        <th>
          <label>
            <input type="checkbox" class="checkbox" />
          </label>
        </th>
        <td>
          <div class="flex items-center gap-3">
            <div class="avatar">
              <div class="h-20 w-20">
                <img
                  src="/src/assets/images/Panneau2.jpg"
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div class="font-bold">Panneau2.jpg</div>
            </div>
          </div>
        </td>
        <td>
        Ville,Rue,Code postal
          <br />
          <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-500 dark:text-white">Disponible</span>
        </td>
        <td>4x3 mètres</td>
        <th>
          <button class="btn btn-ghost btn-xs">details</button>
        </th>
      </tr>
      <!-- row 3 -->
      <tr>
        <th>
          <label>
            <input type="checkbox" class="checkbox" />
          </label>
        </th>
        <td>
          <div class="flex items-center gap-3">
            <div class="avatar">
              <div class="h-20 w-20">
                <img
                  src="/src/assets/images/Panneau3.jpg"
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div class="font-bold">Panneau3.jpg</div>
            </div>
          </div>
        </td>
        <td>
        Ville,Rue,Code postal
          <br />
          <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-500 dark:text-white">Disponible</span>
        </td>
        <td>4x3 mètres</td>
        <th>
          <button class="btn btn-ghost btn-xs">details</button>
        </th>
      </tr>
      <!-- row 4 -->
      <tr>
        <th>
          <label>
            <input type="checkbox" class="checkbox" />
          </label>
        </th>
        <td>
          <div class="flex items-center gap-3">
            <div class="avatar">
              <div class="h-20 w-20">
                <img
                  src="/src/assets/images/Panneau4.jpg"
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div class="font-bold">Panneau4.jpg</div>
            </div>
          </div>
        </td>
        <td>
        Ville,Rue,Code postal
          <br />
          <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-500 dark:text-white">Disponible</span>
        </td>
        <td>4x3 mètres</td>
        <th>
          <button class="btn btn-ghost btn-xs">details</button>
        </th>
      </tr>
    </tbody>
    <!-- foot -->
    <tfoot>
      <tr>
        <th></th>
        <th>Aperçu</th>
        <th>Adresse</th>
        <th>Dimensions</th>
        <th></th>
      </tr>
    </tfoot>
  </table>
</div>
</template>

<style></style>